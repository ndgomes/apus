import os

from fastapi import FastAPI, HTTPException
from models import User
from database import Database

app = FastAPI()
db = Database(os.environ.get("DATABASE"))


async def on_fetch(request, env):
    import asgi

    return await asgi.fetch(app, request, env)


@app.get("/")
async def root():
    return {"message": "Hello, World!"}


@app.post("/create_user/")
async def create_user(user: User):
    if db.user_exists(user.name):
        raise HTTPException(status_code=400, detail="User with this name already exists")

    user_data = user.dict()
    user_data["token"] = User.generate_token()  # Generate token

    db.create_user(user.dict())
    return {"message": f"User {user.name} created successfully, token: {user.token}"}
