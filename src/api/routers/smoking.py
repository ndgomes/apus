# smoking.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime, timedelta

from dependencies import get_db, get_current_user
from schemas.models import User, UserActivityLog

router = APIRouter()


# Pydantic model for user quiz registration request body
class SmokeBaseModel(BaseModel):
    last_cigarette: datetime


class SmokeResponse(BaseModel):
    next_cigarette: datetime


# Endpoint for registering smoke
@router.post("/smoke", response_model=SmokeResponse)
async def register_smoke(
    smoke_data: SmokeBaseModel,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not current_user:
        raise HTTPException(status_code=401, detail="User not authenticated")

    next_cigarette = smoke_data.last_cigarette + timedelta(hours=1)

    # Create and save smoke log
    smoke_log = UserActivityLog(
        user_id=current_user.id,
        last_cigarette=smoke_data.last_cigarette,
        next_cigarette=next_cigarette
    )

    db.add(smoke_log)
    db.commit()

    return {"message": "Smoke log created successfully", "next_cigarette": next_cigarette}
