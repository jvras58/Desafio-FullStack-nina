from pydantic import BaseModel
from datetime import datetime

from app.api.schemas.users import UserSchema



class ComplaintSchema(BaseModel):
    id: str
    user_id: str
    date: datetime
    at_moment: bool
    type: str
    neighborhood: str
    situation: str
    description: str
    created_at: datetime
    updated_at: datetime
    User: UserSchema | None = None

class ComplaintList(BaseModel):
    complaints: list[ComplaintSchema]

class ComplaintUserSchema(BaseModel):
    id: str
    user_id: str
    date: datetime
    at_moment: bool
    type: str
    neighborhood: str
    situation: str
    description: str
    created_at: datetime
    updated_at: datetime
    user_name: str
    user_email: str
    user_phone_number: str
    user_birthdate: datetime
    user_gender: str
    user_ethnicity: str
    user_created_at: datetime
    user_updated_at: datetime

class ComplaintUserList(BaseModel):
    complaints: list[ComplaintUserSchema]
