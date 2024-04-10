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
    password = Column(String)
    createdAt = Column(DateTime, default=datetime.now)
    updatedAt = Column(DateTime, onupdate=datetime.now)

    # Define relationships
    profile = relationship("UserProfile", back_populates="user")
    activityLogs = relationship("UserActivityLog", back_populates="user")
    weeklyStatistics = relationship("UserWeekStatistics", back_populates="user")

class UserProfile(Base):
    __tablename__ = 'user_profiles'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), unique=True)
    cigarettesPerDay = Column(Integer)
    pricePerPackage = Column(Float)
    cigarettesPerPackage = Column(Integer)
    createdAt = Column(DateTime, default=datetime.now)
    updatedAt = Column(DateTime, onupdate=datetime.now)

    user = relationship("User", back_populates="profile")

class UserActivityLog(Base):
    __tablename__ = 'user_activity_logs'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    smokingTime = Column(DateTime)
    createdAt = Column(DateTime, default=datetime.now)

    user = relationship("User", back_populates="activityLogs")

class UserWeekStatistics(Base):
    __tablename__ = 'user_week_statistics'
    id = Column(Integer, primary_key=True, autoincrement=True)
    weekNumber = Column(Integer)
    startDate = Column(DateTime)
    endDate = Column(DateTime)
    user_id = Column(Integer, ForeignKey('users.id'))
    smokingIntervalTime = Column(Integer)
    createdAt = Column(DateTime, default=datetime.now)
    updatedAt = Column(DateTime, onupdate=datetime.now)

    user = relationship("User", back_populates="weeklyStatistics")
