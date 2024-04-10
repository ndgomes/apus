import os
import jwt
import bcrypt 

from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from datetime import datetime, timedelta
from typing import List, Optional

from models import Base, User, UserProfile, UserActivityLog, UserWeekStatistics

# Environment Variables
DATABASE_URL = os.environ.get("DATABASE_URL")
## Secret key for encoding/decoding JWT tokens
SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = os.environ.get("ALGORITHM")

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


# Pydantic model for login request body
class UserLogin(BaseModel):
    username: str
    password: str

# Function to create a JWT token
def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Login route
@app.post("/login")
async def login(user_login: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == user_login.username).first()

    if user is None or not bcrypt.checkpw(user_login.password.encode('utf-8'), user.password.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid username or password")

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

    new_user = User(username=user_signup.username, password=hashed_password.decode('utf-8'))
    db.add(new_user)
    db.commit()

    return {"message": "User created successfully"}