from pydantic import BaseModel
from datetime import datetime


# Pydantic model for user quiz registration request body
class QuizBaseModel(BaseModel):
    cigarettes_per_day: int
    price_per_package: float
    cigarettes_per_package: int


# Pydantic model for user quiz registration request body
class SmokeBaseModel(BaseModel):
    last_cigarette: datetime


# Pydantic model for login request body
class UserLogin(BaseModel):
    email: str
    password: str


# Pydantic model for signup request body
class UserSignup(BaseModel):
    username: str
    email: str
    password: str
