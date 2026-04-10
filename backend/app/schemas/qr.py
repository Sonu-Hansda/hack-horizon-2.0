from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class QRTokenBase(BaseModel):
    access_type: str
    allowed_sections: str
    expires_in_minutes: Optional[int] = 30

class QRTokenCreate(QRTokenBase):
    pass

class QRTokenInDB(QRTokenBase):
    id: int
    token: str
    patient_id: int
    expires_at: datetime
    created_at: datetime
    used_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class QRTokenValidate(BaseModel):
    token: str