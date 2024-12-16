from passlib.context import CryptContext
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from models import User, UserSession
from schemas import UserRegis

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_name(db: Session, user: UserRegis):
    return db.query(User).filter_by(username=user.username).first()




def get_password_hash(password: str):
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)


def create_user(db: Session, user_data: UserRegis):
    db_user = db.query(User).filter(User.username == user_data.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    hashed_password = get_password_hash(user_data.password)
    db_user = User(username=user_data.username, password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_session_by_id(db: Session, us_id: int):
    return db.query(UserSession).filter_by(user_id=us_id).first()


def get_session_by_phone(db: Session, phone: str) -> UserSession:
    return db.query(UserSession).filter_by(phone=phone).first()


def create_or_update_session(db: Session,
                             phone: str = None,
                             user: int = None,

                             session_data: str = None,
                             hash_cod: str = None) -> UserSession:
    session = get_session_by_phone(db, phone)
    if session:
        session.session_data = session_data

    else:
        session = UserSession(
            user_id=user,
            phone=phone,
            session_data=session_data,
            hash_cod=hash_cod)
        db.add(session)
    db.commit()
    db.refresh(session)
    return session


def delete_session_from_db(db: Session, user_id: int):
    session = db.query(UserSession).filter_by(user_id=user_id).first()

    if session:
        db.delete(session)
        db.commit()