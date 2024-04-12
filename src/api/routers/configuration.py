from fastapi import APIRouter, Header, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from pydantic import BaseModel

from dependencies import get_db, get_current_user
from schemas.models import User, Quiz

router = APIRouter()


class UserResponse(BaseModel):
    username: str
    email: str
    created_at: str


class QuizResponse(BaseModel):
    cigarettes_per_day: Optional[int]
    price_per_package: Optional[float]
    cigarettes_per_package: Optional[int]


class ConfigurationResponse(BaseModel):
    message: dict


# Route for fetching user configuration
@router.get("/configuration", response_model=ConfigurationResponse)
async def configuration(token: str = Header(...), current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=401, detail="User not authenticated")

    # Query user profile information
    user = db.query(User).filter(User.id == current_user.id).first()
    quiz = db.query(Quiz).filter(Quiz.user_id == current_user.id).first()

    user_response = UserResponse(
        username=user.username,
        email=user.email,
        created_at=str(user.created_at)
    )

    quiz_response = QuizResponse(
        cigarettes_per_day=getattr(quiz, "cigarettes_per_day", None),
        price_per_package=getattr(quiz, "price_per_package", None),
        cigarettes_per_package=getattr(quiz, "cigarettes_per_package", None)
    )

    return ConfigurationResponse(message={"user": user_response.dict(), "quiz": quiz_response.dict()})