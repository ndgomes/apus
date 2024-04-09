from pydantic import BaseModel
from typing import Optional
import secrets


class User(BaseModel):
    name: str
    token: Optional[str]
    cigarettes_per_day: int
    price_per_package: float
    cigarettes_per_package: int

    @classmethod
    def generate_token(cls):
        return secrets.token_urlsafe(16)
