from telethon import TelegramClient
from telethon.sessions import StringSession
from fastapi import HTTPException

class TelegramClientManager:
    """
    Менеджер для роботи з TelegramClient із вбудованою обробкою винятків.
    """
    def __init__(self, session_data: str, api_id: int, api_hash: str):
        self.session = StringSession(session_data)
        self.client = TelegramClient(self.session, api_id, api_hash)

    async def __aenter__(self):
        await self.client.connect()
        return self.client

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.client.disconnect()
        if exc_type:
            raise HTTPException(status_code=500, detail=f"Telegram Client Error: {exc_val}")
