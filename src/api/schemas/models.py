# models.py
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()


# Define SQLAlchemy models
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    is_first_time = Column(Boolean, default=True)
    username = Column(String, unique=True)
    email = Column(String, unique=True)
    password = Column(String)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, onupdate=datetime.now)

    # Define relationships
    profile = relationship("Quiz", back_populates="user")
    activity_logs = relationship("UserActivityLog", back_populates="user")
    statistics = relationship("Statistics", back_populates="user")


class Quiz(Base):
    __tablename__ = 'quiz'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), unique=True)
    cigarettes_per_day = Column(Integer)
    price_per_package = Column(Float)
    cigarettes_per_package = Column(Integer)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, onupdate=datetime.now)

    user = relationship("User", back_populates="profile")


class UserActivityLog(Base):
    __tablename__ = 'user_activity_logs'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    last_cigarette = Column(DateTime, default=datetime.now)
    next_cigarette = Column(DateTime)

    user = relationship("User", back_populates="activity_logs")


class Statistics(Base):
    __tablename__ = 'statistics'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), unique=True)
    total_saved_cigarettes = Column(Integer)
    total_saved_money = Column(Float)
    updated_at = Column(DateTime, onupdate=datetime.now)

    user = relationship("User", back_populates="statistics")


# revoked_token model
class RevokedToken(Base):
    __tablename__ = "revoked_tokens"
    id = Column(Integer, primary_key=True, index=True)
    jti = Column(String, unique=True, index=True)
