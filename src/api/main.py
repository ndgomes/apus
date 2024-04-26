# main.py
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from dependencies import get_db, create_tables
from routers import api_router


app = FastAPI()
router = APIRouter()

# CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(api_router)


# Database setup
@app.on_event("startup")
async def startup_event():
    get_db()
    create_tables()


# Root route
@app.get("/")
async def root():
    return {"message": "not found"}
