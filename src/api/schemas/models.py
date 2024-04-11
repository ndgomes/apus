# models.py
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()


# Define SQLAlchemy models
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String, unique=True)
    email = Column(String, unique=True)
    password = Column(String)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, onupdate=datetime.now)

    # Define relationships
    profile = relationship("Quiz", back_populates="user")
    activity_logs = relationship("UserActivityLog", back_populates="user")
    weekly_statistics = relationship("UserWeekStatistics", back_populates="user")


class Quiz(Base):
    __tablename__ = 'quiz'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), unique=True)
    cigarretes_per_day = Column(Integer)
    price_per_package = Column(Float)
    cigarretes_per_package = Column(Integer)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, onupdate=datetime.now)

    user = relationship("User", back_populates="profile")


class UserActivityLog(Base):
    __tablename__ = 'user_activity_logs'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    smoking_time = Column(DateTime)
    created_at = Column(DateTime, default=datetime.now)

    user = relationship("User", back_populates="activity_logs")


class UserWeekStatistics(Base):
    __tablename__ = 'user_week_statistics'
    id = Column(Integer, primary_key=True, autoincrement=True)
    week_number = Column(Integer)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    user_id = Column(Integer, ForeignKey('users.id'))
    smoking_interval_time = Column(Integer)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, onupdate=datetime.now)

    user = relationship("User", back_populates="weekly_statistics")


# revoked_token model
class RevokedToken(Base):
    __tablename__ = "revoked_tokens"
    id = Column(Integer, primary_key=True, index=True)
    jti = Column(String, unique=True, index=True)
