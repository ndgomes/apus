from fastapi import APIRouter

from routers import auth, user

api_router = APIRouter()
api_router.include_router(auth.router, tags=["Auth"])
api_router.include_router(user.router, tags=["User Basic Profile"])