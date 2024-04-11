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
app.add_event_handler("startup", get_db)

# Create the database tables if they don't exist
app.add_event_handler("startup", create_tables)


# Root route
@app.get("/")
async def root():
    return {"message": "Hello World"}
