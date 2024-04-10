import os

# Environment Variables
DATABASE_URL = os.environ.get("DATABASE_URL")
# Secret key for encoding/decoding JWT tokens
SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = os.environ.get("ALGORITHM")
