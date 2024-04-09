from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()


class User(Base):
    __tablename__ = 'users'

    name = Column(String, primary_key=True)
    token = Column(String)
    cigarettes_per_day = Column(Integer)
    price_per_package = Column(Float)
    cigarettes_per_package = Column(Integer)


class Database:
    def __init__(self, db_url):
        self.engine = create_engine(db_url)
        Base.metadata.create_all(self.engine)
        self.Session = sessionmaker(bind=self.engine)

    def user_exists(self, name):
        session = self.Session()
        user = session.query(User).filter_by(name=name).first()
        session.close()
        return user is not None

    def create_user(self, user_data):
        session = self.Session()
        user = User(**user_data)
        session.add(user)
        session.commit()
        session.close()
