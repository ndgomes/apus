# user.py
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

from schemas.models import UserProfile, User
from dependencies import get_db, get_current_user

router = APIRouter()


# Pydantic model for user profile registration request body
class UserProfileRegistration(BaseModel):
    cigarettes_per_day: int
    price_per_package: float
    cigarettes_per_package: int


# Endpoint for registering user profile
@router.post("/user/profile")
async def register_user_profile(
    profile_data: UserProfileRegistration,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not current_user:
        raise HTTPException(status_code=401, detail="User not authenticated")

    # Create and save user profile
    user_profile = UserProfile(
        user_id=current_user.id,
        cigarettesPerDay=profile_data.cigarettes_per_day,
        pricePerPackage=profile_data.price_per_package, 
        cigarettesPerPackage=profile_data.cigarettes_per_package
    )
    db.add(user_profile)
    db.commit()

    return {"message": "User profile created successfully"}


# Endpoint for retrieving user profile
@router.get("/user/profile")
async def get_user_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not current_user:
        raise HTTPException(status_code=401, detail="User not authenticated")

    # Query user profile information
    user_profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    if not user_profile:
        raise HTTPException(status_code=404, detail="User profile not found")

    # Return user profile information
    return {
        "cigarettes_per_day": user_profile.cigarettesPerDay,
        "price_per_package": user_profile.pricePerPackage,
        "cigarettes_per_package": user_profile.cigarettesPerPackage
    }


# Endpoint for updating user profile
@router.put("/user/profile")
async def update_user_profile(
    profile_data: UserProfileRegistration,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not current_user:
        raise HTTPException(status_code=401, detail="User not authenticated")

    # Query user profile information
    user_profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    if not user_profile:
        raise HTTPException(status_code=404, detail="User profile not found")

    # Update user profile with new data
    user_profile.cigarettesPerDay = profile_data.cigarettes_per_day
    user_profile.pricePerPackage = profile_data.price_per_package
    user_profile.cigarettesPerPackage = profile_data.cigarettes_per_package

    # Save the updated profile
    db.commit()

    return {"message": "User profile updated successfully"}