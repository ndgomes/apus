#main.py
import jwt
import bcrypt 

from fastapi import FastAPI, HTTPException, Depends, Header
from pydantic import BaseModel
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from datetime import datetime, timedelta
from typing import Optional

from models import Base, User, UserProfile
from settings import DATABASE_URL, SECRET_KEY, ALGORITHM

# Database
engine = create_engine(DATABASE_URL)
Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables in the database
Base.metadata.create_all(bind=engine)

# Initialize FastAPI
app = FastAPI()


# Dependency to get the database session
def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def root():
    return {"message": "Hello World"}


# Function to create a JWT token
def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# Pydantic model for login request body
class UserLogin(BaseModel):
    email: str
    password: str


# Login route
@app.post("/login")
async def login(user_login: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_login.email).first()

    if user is None or not bcrypt.checkpw(user_login.password.encode('utf-8'), user.password.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer", "user": user.username}


# Pydantic model for signup request body
class UserSignup(BaseModel):
    username: str
    email: str
    password: str
    confirm_password: str


# Route for user signup
@app.post("/signup")
async def signup(user_signup: UserSignup, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.username == user_signup.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    if user_signup.password != user_signup.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    # Hash the password before storing it
    hashed_password = bcrypt.hashpw(user_signup.password.encode('utf-8'), bcrypt.gensalt())

    new_user = User(username=user_signup.username, email=user_signup.email, password=hashed_password.decode('utf-8'))
    db.add(new_user)
    db.commit()

    return {"message": "User created successfully"}


# Pydantic model for user profile registration request body
class UserProfileRegistration(BaseModel):
    cigarettes_per_day: int
    price_per_package: float
    cigarettes_per_package: int


# Dependency to get the currently logged-in user
async def get_current_user(token: str = Header(...), db: Session = Depends(get_db)) -> Optional[User]:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            return None
        user = db.query(User).filter(User.username == username).first()
        return user
    except Exception:
        return None


# Endpoint for registering user profile
@app.post("/user/profile")
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
@app.get("/user/profile")
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
@app.put("/user/profile")
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