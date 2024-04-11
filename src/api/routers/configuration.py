from fastapi import APIRouter, Header, Depends, HTTPException
from sqlalchemy.orm import Session

from dependencies import get_db, get_current_user
from schemas.models import User, Quiz

router = APIRouter()


# Route for get user profile
@router.get("/configuration")
async def configuration(token: str = Header(...), current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=401, detail="User not authenticated")

    # Query user profile information
    user = db.query(User).filter(User.id == current_user.id).first()
    quiz = db.query(Quiz).filter(Quiz.user_id == current_user.id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": {
        "user": {
            "username": user.username,
            "email": user.email,
            "created_at": user.created_at
        },
        "quiz": {
            "cigarretes_per_day": getattr(quiz, "cigarretes_per_day", None),
            "price_per_package": getattr(quiz, "price_per_package", None),
            "cigarretes_per_package": getattr(quiz, "cigarretes_per_package", None)
        }
    }}
