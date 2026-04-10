from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from .user import UserInDB
from .doctor import DoctorInDB

class VisitBase(BaseModel):
    diagnosis: Optional[str] = None
    notes: Optional[str] = None
    doctor_name: Optional[str] = None
    hospital_name: Optional[str] = None
    examine_area: Optional[str] = None
    location: Optional[str] = None
    date: Optional[datetime] = None

class VisitCreate(VisitBase):
    pass

class VisitUpdate(BaseModel):
    diagnosis: Optional[str] = None
    notes: Optional[str] = None
    doctor_name: Optional[str] = None
    hospital_name: Optional[str] = None
    examine_area: Optional[str] = None
    location: Optional[str] = None

class VisitInDB(VisitBase):
    id: int
    patient_id: int
    doctor_id: Optional[int] = None
    date: datetime
    
    class Config:
        from_attributes = True

class VisitWithRelations(VisitInDB):
    patient: UserInDB
    doctor: Optional[DoctorInDB] = None

class PrescriptionBase(BaseModel):
    medicine_name: str
    dosage: str
    frequency: str
    duration: str
    instructions: Optional[str] = None

class PrescriptionCreate(PrescriptionBase):
    pass

class PrescriptionInDB(PrescriptionBase):
    id: int
    visit_id: int
    
    class Config:
        from_attributes = True

class MedicationBase(BaseModel):
    medicine_name: str
    dosage: str
    frequency: str
    start_date: datetime
    end_date: Optional[datetime] = None

class MedicationCreate(MedicationBase):
    pass

class MedicationInDB(MedicationBase):
    id: int
    visit_id: int
    
    class Config:
        from_attributes = True

class ReportBase(BaseModel):
    file_name: str
    file_type: str

class ReportCreate(ReportBase):
    pass

class ReportInDB(ReportBase):
    id: int
    visit_id: Optional[int] = None
    file_url: Optional[str] = None
    document_type: Optional[str] = None
    extracted_data: Optional[dict] = None
    uploaded_at: datetime
    
    class Config:
        from_attributes = True
