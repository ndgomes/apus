# quiz.py
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from schemas.models import Quiz, User
from schemas.requests import QuizBaseModel
from dependencies import get_db, get_current_user
from handlers.handlers import populate_reduction_phases

router = APIRouter()


# Endpoint for registering user quiz
@router.post("/quiz")
async def register_quiz(
    profile_data: QuizBaseModel,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not current_user:
        raise HTTPException(status_code=401, detail="User not authenticated")

    # Create and save user quiz
    try:
        quiz = Quiz(
            user_id=current_user.id,
            cigarettes_per_day=profile_data.cigarettes_per_day,
            price_per_package=profile_data.price_per_package,
            cigarettes_per_package=profile_data.cigarettes_per_package
        )
        db.add(quiz)
    except Exception:
        return {"message": "user quiz already created"}

    # First time user is now False
    current_user.is_first_time = False
    db.commit()

    try:
        populate_reduction_phases(
            current_user.id, profile_data.cigarettes_per_day, db)
    except Exception:
        raise HTTPException(
            status_code=506, detail="error populating reduction phases")

    return {"message": "user quiz created successfully"}


# Endpoint for updating user quiz
@router.put("/quiz")
async def update_quiz(
    profile_data: QuizBaseModel,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not current_user:
        raise HTTPException(status_code=401, detail="User not authenticated")

    # Query user quiz information
    quiz = db.query(Quiz).filter(Quiz.user_id == current_user.id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="User quiz not found")

    # Update user quiz with new data
    quiz.cigarettes_per_day = profile_data.cigarettes_per_day
    quiz.price_per_package = profile_data.price_per_package
    quiz.cigarettes_per_package = profile_data.cigarettes_per_package

    # Save the updated profile
    db.commit()

    try:
        populate_reduction_phases(
            current_user.id, profile_data.cigarettes_per_day, db)
    except Exception:
        raise HTTPException(
            status_code=506, detail="error populating reduction phases")

    return {"message": "User quiz updated successfully"}
