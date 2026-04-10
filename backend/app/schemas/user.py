from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    phone: Optional[str] = None
    date_of_birth: Optional[datetime] = None
    
    # Health Profile Fields
    age: Optional[int] = None
    sex: Optional[str] = None
    blood_group: Optional[str] = None
    height: Optional[float] = None
    weight: Optional[float] = None
    hr: Optional[int] = None
    bp: Optional[str] = None
    resp_rate: Optional[int] = None
    spo2: Optional[int] = None
    steps_goal: Optional[int] = None
    sleep_goal: Optional[float] = None
    activity_level: Optional[str] = None
    water_intake_goal: Optional[float] = None
    primary_concerns: Optional[str] = None
    family_history: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    date_of_birth: Optional[datetime] = None
    
    # Health Profile Fields
    age: Optional[int] = None
    sex: Optional[str] = None
    blood_group: Optional[str] = None
    height: Optional[float] = None
    weight: Optional[float] = None
    hr: Optional[int] = None
    bp: Optional[str] = None
    resp_rate: Optional[int] = None
    spo2: Optional[int] = None
    steps_goal: Optional[int] = None
    sleep_goal: Optional[float] = None
    activity_level: Optional[str] = None
    water_intake_goal: Optional[float] = None
    primary_concerns: Optional[str] = None
    family_history: Optional[str] = None

class UserInDB(UserBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: Optional[UserInDB] = None

class TokenData(BaseModel):
    email: Optional[str] = None