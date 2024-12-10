from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from app.contextTelegram import TelegramClientManager
from app.crud import create_user, create_or_update_session,get_session_by_id, \
    get_user_by_name, verify_password, delete_session_from_db
from app.db import get_db
from app.schemas import PhoneNumber, VerifyTelegramRequest, UserRegis, UserToken
from app.security import create_access_token, verify_token
from fastapi.security import HTTPAuthorizationCredentials


router = APIRouter()



import os
from dotenv import load_dotenv

load_dotenv()


api_hash=os.getenv("API_HASH")
api_id = os.getenv("API_ID")



@router.post("/login")
async def login(request: UserRegis, db: Session = Depends(get_db)):
    user = get_user_by_name(db, request)

    if not user:
        raise HTTPException(status_code=400, detail="User not found")

    if not verify_password(request.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid verification code")

    access_token = create_access_token({"user_id": user.id})

    return {"msg": "Login successful", "access_token": access_token}

@router.post("/register")
async def register(user_data: UserRegis, db: Session = Depends(get_db)):
    user = create_user(db, user_data)
    ustok = create_access_token({"user_id": user.id})
    return {"msg": "User registered", "user": user, "access_token": ustok}




@router.post('/auth/telegram/start' )
async def start_telegram_auth(phone: PhoneNumber,
                              db: Session = Depends(get_db),
                              user: UserToken = Depends(verify_token)):


    async with TelegramClientManager(session_data="", api_id=api_id, api_hash=api_hash) as client:

        send_code = await client.send_code_request(str(phone.phone))
        session_data = client.session.save()
        phone_code_hash = send_code.phone_code_hash

        create_or_update_session(db, phone.phone,
                                 user=user,
                                 session_data=session_data,
                                 hash_cod=phone_code_hash)

        return {"status": "OTP Sent"}


@router.delete('/auth/telegram/logout')
async def logout_telegram(db: Session = Depends(get_db),
                           user: UserToken = Depends(verify_token)):
    delete_session_from_db(db, user)

    async with TelegramClientManager(session_data="", api_id=api_id, api_hash=api_hash) as client:
        await client.log_out()

    return {"status": "Logged out successfully"}


@router.post('/auth/telegram/verify')
async def verify_telegram(request: VerifyTelegramRequest,
                          db: Session = Depends(get_db),
                          user: UserToken = Depends(verify_token)):
    client_data = get_session_by_id(db, user)
    if not client_data or client_data.user_id != user:
        return {"status": "Error", "message": "Session not found"}

    async with TelegramClientManager(client_data.session_data, api_id, api_hash) as client:
        phone_code_hash = client_data.hash_cod
        await client.sign_in(client_data.phone, request.code, phone_code_hash=phone_code_hash)
        session_data = client.session.save()
        create_or_update_session(db, session_data)
        return {"status": "Success", "message": "Logged in!"}



@router.get('/auth/telegram/chats')
async def get_user_chats(
                         db: Session = Depends(get_db),
                         user: HTTPAuthorizationCredentials = Depends(verify_token)):
    session = get_session_by_id(db, user)

    if not session or session.user_id != user:
        return {"status": "Error", "message": "Session not found"}


    async with TelegramClientManager(session.session_data, api_id, api_hash) as client:
        chats = []

        async for dialog in client.iter_dialogs():

            chats.append({"name": dialog.name,"id": dialog.id,})

        return {"chats": chats}



@router.get('/chats/messages')
async def get_all_messages(chat_id: int,
                           db: Session = Depends(get_db),
                           user: UserToken = Depends(verify_token)):

    session = get_session_by_id(db, user)

    if not session or session.user_id != user:
        return {"status": "Error", "message": "Session not found"}

    async with TelegramClientManager(session.session_data, api_id, api_hash) as client:

        await client.get_dialogs()
        chat = await client.get_entity(chat_id)
        messages = await client.get_messages(chat, limit=100)
        messages_list = []

        for message in messages:
            messages_list.append({
                "id": message.id,
                "text": message.text,
                "date": message.date,

            })

        return {"status": "Success", "messages": messages_list}


