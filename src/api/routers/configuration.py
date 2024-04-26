from fastapi import APIRouter, Header, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc, func, Date
from datetime import date, timedelta

from dependencies import get_db, get_current_user
from schemas.models import User, Quiz, UserActivityLog, ReductionPhase
from schemas.response import ConfigurationResponse, UserResponse, QuizResponse, SmokeLogResponse, ReductionPhaseResponse
from handlers.handlers import calculate_saved_cigarettes_and_money, calculate_percentage_reduction_phase

router = APIRouter()


# Route for fetching user configuration
@ router.get("/configuration", response_model=ConfigurationResponse)
async def configuration(token: str = Header(...), current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=401, detail="User not authenticated")

    # Dates validation

    today = date.today()

    # Query user profile information
    user = db.query(User).filter(User.id == current_user.id).first()
    quiz = db.query(Quiz).filter(Quiz.user_id == current_user.id).first()
    history = db.query(UserActivityLog).filter(
        UserActivityLog.user_id == current_user.id, func.date(UserActivityLog.last_cigarette, type_=Date) >= today).filter(
        func.date(UserActivityLog.last_cigarette,
                  type_=Date) < today + timedelta(days=1)
    ).all()
    current_reduction_phase = db.query(ReductionPhase).filter(
        ReductionPhase.user_id == current_user.id, func.date(ReductionPhase.start_date, type_=Date) >= today).first()

    smoke_log = db.query(UserActivityLog).filter(
        UserActivityLog.user_id == current_user.id).order_by(desc(UserActivityLog.last_cigarette)).first()

    user_response = UserResponse(
        username=user.username,
        email=user.email,
        is_first_time=user.is_first_time,
        created_at=user.created_at
    )

    quiz_response = QuizResponse(
        cigarettes_per_day=getattr(quiz, "cigarettes_per_day", None),
        price_per_package=getattr(quiz, "price_per_package", None),
        cigarettes_per_package=getattr(quiz, "cigarettes_per_package", None)
    )

    smoke_log_response = SmokeLogResponse(last_cigarette=getattr(
        smoke_log, "last_cigarette", None), next_cigarette=getattr(smoke_log, "next_cigarette", None))

    history = [activity.last_cigarette for activity in history]

    saved_cigarettes_and_money = calculate_saved_cigarettes_and_money(
        current_user.id, db)

    current_reduction_phase_response = ReductionPhaseResponse(phase_number=getattr(
        current_reduction_phase, "phase_number", None), time_between_cigarettes=getattr(current_reduction_phase, "time_between_cigarettes", None), start_date=getattr(current_reduction_phase, "start_date", None), end_date=getattr(current_reduction_phase, "end_date", None), percentage_reduction_phase=calculate_percentage_reduction_phase(current_reduction_phase))

    return ConfigurationResponse(config={"user": user_response.model_dump(), "quiz": quiz_response.model_dump(), "smoke_log": smoke_log_response.model_dump(), "history": history, "saved_cigarettes_and_money": saved_cigarettes_and_money, "current_reduction_phase": current_reduction_phase_response})
