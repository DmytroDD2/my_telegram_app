from pydantic import BaseModel


class PhoneNumber(BaseModel):
    phone: str

class VerifyTelegramRequest(BaseModel):
    code: str

class UserRegis(BaseModel):
    username: str
    password: str


class UserToken(BaseModel):
    id: str