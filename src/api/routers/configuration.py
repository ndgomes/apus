from fastapi import APIRouter, Header, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc, func, Date
from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime, date, timedelta

from dependencies import get_db, get_current_user
from schemas.models import User, Quiz, UserActivityLog, Statistics

router = APIRouter()


def calculate_saved_cigarettes_and_money(user_id: int, db: Session):
    saved_money = 0
    saved_cigarettes = 0

    # Query user's quiz data
    quiz = db.query(Quiz).filter(Quiz.user_id == user_id).first()

    if not quiz:
        return None, None

    price_per_day = ((quiz.cigarettes_per_day /
                     quiz.cigarettes_per_package) * quiz.price_per_package)

    today = date.today()
    yesterday = today - timedelta(days=1)

    # Query user's smoke logs from yesterday
    yesterday_smoke_logs = db.query(UserActivityLog).filter(
        UserActivityLog.user_id == user_id, func.date(UserActivityLog.last_cigarette, type_=Date) >= yesterday).filter(
        func.date(UserActivityLog.last_cigarette,
                  type_=Date) < today).all()

    yesterday_cigarettes = 0

    for cigarette in yesterday_smoke_logs:
        yesterday_cigarettes += 1

    yesterday_price = (
        (yesterday_cigarettes / quiz.cigarettes_per_package) * quiz.price_per_package)

    if yesterday_price < price_per_day:
        saved_money = (price_per_day - yesterday_price)

    if yesterday_cigarettes < quiz.cigarettes_per_day:
        saved_cigarettes = (quiz.cigarettes_per_day - yesterday_cigarettes)

    # Update or create statistics entry
    statistics = db.query(Statistics).filter(
        Statistics.user_id == user_id).first()

    if statistics and statistics.updated_at is None:
        statistics.total_saved_cigarettes = 0
        statistics.total_saved_money = 0

    elif statistics and statistics.updated_at.date() < today:
        # Update existing statistics
        statistics.total_saved_cigarettes += saved_cigarettes
        statistics.total_saved_money += saved_money

    elif not statistics:
        # Create new statistics entry
        statistics = Statistics(
            user_id=user_id
        )
        db.add(statistics)

    db.commit()

    return {'total_saved_cigarettes': statistics.total_saved_cigarettes, 'total_saved_money': statistics.total_saved_money}


class UserResponse(BaseModel):
    username: str
    email: str
    is_first_time: bool
    created_at: datetime


class QuizResponse(BaseModel):
    cigarettes_per_day: Optional[int]
    price_per_package: Optional[float]
    cigarettes_per_package: Optional[int]


class SmokeLogResponse(BaseModel):
    last_cigarette: Optional[datetime]
    next_cigarette: Optional[datetime]


class ConfigurationResponse(BaseModel):
    config: dict


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

    return ConfigurationResponse(config={"user": user_response.dict(), "quiz": quiz_response.dict(), "smoke_log": smoke_log_response.dict(), "history": history, "saved_cigarettes_and_money": saved_cigarettes_and_money})
