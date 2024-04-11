# dependencies.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi import Depends, Header
from typing import Optional
import jwt

from settings import DATABASE_URL, SECRET_KEY, ALGORITHM
from schemas.models import User, Base

engine = create_engine(DATABASE_URL)
Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()


def create_tables():
    Base.metadata.create_all(bind=engine)


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
