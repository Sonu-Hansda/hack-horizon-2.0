from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class QRTokenBase(BaseModel):
    access_type: str
    allowed_sections: str
    selected_report_ids: Optional[str] = None
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

class SharedHealthProfile(BaseModel):
    # Core Biometrics
    age: Optional[int] = None
    sex: Optional[str] = None
    blood_group: Optional[str] = None
    height: Optional[float] = None
    weight: Optional[float] = None
    # Vitals
    hr: Optional[int] = None
    bp: Optional[str] = None
    resp_rate: Optional[int] = None
    spo2: Optional[int] = None
    # Lifestyle
    steps_goal: Optional[int] = None
    sleep_goal: Optional[float] = None
    activity_level: Optional[str] = None
    water_intake_goal: Optional[float] = None
    # History
    primary_concerns: Optional[str] = None
    family_history: Optional[str] = None

    class Config:
        from_attributes = True

class SharedMedication(BaseModel):
    id: Optional[int] = None
    medicine_name: str
    dosage: str
    frequency: str
    instructions: Optional[str] = None

    class Config:
        from_attributes = True

class SharedReport(BaseModel):
    id: Optional[int] = None
    file_name: str
    file_type: str
    document_type: str
    file_url: Optional[str] = None
    uploaded_at: datetime
    extracted_data: Optional[dict] = None

    class Config:
        from_attributes = True

class SharedVisit(BaseModel):
    id: Optional[int] = None
    doctor_name: Optional[str] = None
    hospital_name: Optional[str] = None
    examine_area: Optional[str] = None
    location: Optional[str] = None
    date: datetime
    diagnosis: Optional[str] = None
    notes: Optional[str] = None
    prescriptions: List[SharedMedication] = []
    reports: List[SharedReport] = []

    class Config:
        from_attributes = True

class SharedDataResponse(BaseModel):
    full_name: str
    expires_at: datetime
    allowed_sections: List[str]
    profile: Optional[SharedHealthProfile] = None
    visits: List[SharedVisit] = []
    unlinked_reports: List[SharedReport] = []

    class Config:
        from_attributes = True