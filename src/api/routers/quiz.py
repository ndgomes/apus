# quiz.py
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

from schemas.models import Quiz, User
from dependencies import get_db, get_current_user

router = APIRouter()


# Pydantic model for user quiz registration request body
class QuizBaseModel(BaseModel):
    cigarettes_per_day: int
    price_per_package: float
    cigarettes_per_package: int


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
    quiz = Quiz(
        user_id=current_user.id,
        cigarretes_per_day=profile_data.cigarettes_per_day,
        price_per_package=profile_data.price_per_package,
        cigarretes_per_package=profile_data.cigarettes_per_package
    )
    db.add(quiz)
    db.commit()

    # First time user is now False
    current_user.is_first_time = False
    db.commit()

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
    quiz.cigarretes_per_day = profile_data.cigarettes_per_day
    quiz.price_per_package = profile_data.price_per_package
    quiz.cigarretes_per_package = profile_data.cigarettes_per_package

    # Save the updated profile
    db.commit()

    return {"message": "User quiz updated successfully"}
