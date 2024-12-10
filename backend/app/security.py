from jose import jwt, JWTError, ExpiredSignatureError
import datetime
from fastapi import HTTPException, Depends, Header
from typing import Any
from fastapi.security import APIKeyHeader, HTTPBearer, HTTPAuthorizationCredentials




SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_HOUR = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7


http_bearer = HTTPBearer()


def create_access_token(data: dict, expires_delta=datetime.timedelta(hours=ACCESS_TOKEN_EXPIRE_HOUR)):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.datetime.utcnow() + expires_delta
    else:
        expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    # refresh_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt

def verify_token(token: HTTPAuthorizationCredentials = Depends(http_bearer)) -> Any:

    token = token.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload["user_id"]
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


def check_session(session, user_id):
    if not session or session.user_id != user_id:
        return {"status": "Error", "message": "Session not found"}


