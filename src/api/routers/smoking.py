# smoking.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date, timedelta
from sqlalchemy import func, Date

from dependencies import get_db, get_current_user
from schemas.models import User, UserActivityLog, ReductionPhase
from schemas.requests import SmokeBaseModel
from schemas.response import SmokeResponse

router = APIRouter()


# Endpoint for registering smoke
@router.post("/smoke", response_model=SmokeResponse)
async def register_smoke(
    smoke_data: SmokeBaseModel,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not current_user:
        raise HTTPException(status_code=401, detail="User not authenticated")

    today = date.today()

    current_reduction_phase = db.query(ReductionPhase).filter(
        ReductionPhase.user_id == current_user.id, func.date(ReductionPhase.start_date, type_=Date) >= today).first()

    current_time_between_cigarettes = current_reduction_phase.time_between_cigarettes

    next_cigarette = smoke_data.last_cigarette + \
        timedelta(minutes=current_time_between_cigarettes)

    # Create and save smoke log
    smoke_log = UserActivityLog(
        user_id=current_user.id,
        last_cigarette=smoke_data.last_cigarette,
        next_cigarette=next_cigarette
    )

    db.add(smoke_log)
    db.commit()

    return {"message": "Smoke log created successfully", "next_cigarette": next_cigarette}
