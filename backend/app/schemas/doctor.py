from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class DoctorBase(BaseModel):
    name: str
    hospital: str
    license_number: Optional[str] = None

class DoctorCreate(DoctorBase):
    pass

class DoctorInDB(DoctorBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True