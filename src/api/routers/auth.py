# auth.py
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
import jwt
import bcrypt
from datetime import datetime, timedelta
from routers.user import User
from pydantic import BaseModel

from settings import SECRET_KEY, ALGORITHM
from dependencies import get_db

router = APIRouter()


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
@router.post("/login")
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
@router.post("/signup")
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