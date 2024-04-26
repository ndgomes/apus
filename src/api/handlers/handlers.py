import uuid
import jwt

from datetime import timezone
from fastapi import HTTPException
from datetime import date, datetime, timedelta
from sqlalchemy.orm import Session
from sqlalchemy import func, Date

from schemas.models import Quiz, UserActivityLog, Statistics, ReductionPhase
from settings import SECRET_KEY, ALGORITHM


# Function to create a JWT token
def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode |= {"exp": expire, "jti": str(uuid.uuid4())}
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# Function to decode JWT token
def decode_access_token(token: str):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.DecodeError:
        raise HTTPException(status_code=401, detail="Could not decode token")


# Function to calculate saved cigarettes and money
def calculate_saved_cigarettes_and_money(user_id: int, db: Session):
    saved_money = 0
    saved_cigarettes = 0

    # Query user's quiz data
    quiz = db.query(Quiz).filter(Quiz.user_id == user_id).first()

    if not quiz:
        return None, None

    price_per_day = ((quiz.cigarettes_per_day /
                     quiz.cigarettes_per_package) * quiz.price_per_package)

    today = date.today()
    yesterday = today - timedelta(days=1)

    # Query user's smoke logs from yesterday
    yesterday_smoke_logs = db.query(UserActivityLog).filter(
        UserActivityLog.user_id == user_id, func.date(UserActivityLog.last_cigarette, type_=Date) >= yesterday).filter(
        func.date(UserActivityLog.last_cigarette,
                  type_=Date) < today).all()

    yesterday_cigarettes = len(yesterday_smoke_logs)

    yesterday_price = (
        (yesterday_cigarettes / quiz.cigarettes_per_package) * quiz.price_per_package)

    if yesterday_price < price_per_day:
        saved_money = (price_per_day - yesterday_price)

    if yesterday_cigarettes < quiz.cigarettes_per_day:
        saved_cigarettes = (quiz.cigarettes_per_day - yesterday_cigarettes)

    # Update or create statistics entry
    statistics = db.query(Statistics).filter(
        Statistics.user_id == user_id).first()

    if statistics and statistics.updated_at is None:
        statistics.total_saved_cigarettes = 0
        statistics.total_saved_money = 0

    elif statistics and statistics.updated_at.date() < today:
        # Update existing statistics
        statistics.total_saved_cigarettes += saved_cigarettes
        statistics.total_saved_money += saved_money

    elif not statistics:
        # Create new statistics entry
        statistics = Statistics(
            user_id=user_id
        )
        db.add(statistics)

    db.commit()

    return {'total_saved_cigarettes': statistics.total_saved_cigarettes, 'total_saved_money': statistics.total_saved_money}


def populate_reduction_phases(user_id: int, cigarettes_per_day: int, db: Session):
    phase_duration = 7

    for i in range(cigarettes_per_day, 0, -1):
        time_between_cigarettes = round((16 * 60) / i)

        # Calculate the start date and end date for the current phase
        start_date = datetime.now().date() + \
            timedelta(days=(cigarettes_per_day - i) * phase_duration)
        end_date = start_date + timedelta(days=phase_duration)

        # Query existing phases for the user
        user_phases = db.query(ReductionPhase).filter(
            ReductionPhase.user_id == user_id, ReductionPhase.phase_number == cigarettes_per_day - i + 1).first()

        if not user_phases:
            # Create a new ReductionPhase object for the current phase
            phase = ReductionPhase(
                user_id=user_id,
                phase_number=cigarettes_per_day - i + 1,
                cigarettes_per_day=i,
                time_between_cigarettes=time_between_cigarettes,
                start_date=start_date,
                end_date=end_date
            )
            db.add(phase)
        else:
            # Update existing phase
            user_phases.cigarettes_per_day = i
            user_phases.time_between_cigarettes = time_between_cigarettes
            user_phases.start_date = start_date
            user_phases.end_date = end_date

    db.commit()

    return {"message": "Reduction phases populated"}
