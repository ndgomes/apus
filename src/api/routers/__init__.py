from fastapi import APIRouter

from routers import auth, quiz, configuration

api_router = APIRouter()
api_router.include_router(auth.router, tags=["Auth"])
api_router.include_router(quiz.router, tags=["Quiz"])
api_router.include_router(configuration.router, tags=["Configuration"])
