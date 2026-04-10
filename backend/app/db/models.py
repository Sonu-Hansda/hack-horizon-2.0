from sqlmodel import SQLModel, Field, Relationship, Column, JSON
from typing import Optional, List
from datetime import datetime
from uuid import UUID, uuid4

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str
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
    
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    visits: List["Visit"] = Relationship(back_populates="patient")

class Doctor(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    hospital: str
    license_number: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Visit(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    patient_id: int = Field(foreign_key="user.id")
    doctor_id: Optional[int] = Field(foreign_key="doctor.id", default=None)
    doctor_name: Optional[str] = None
    hospital_name: Optional[str] = None
    examine_area: Optional[str] = None  # e.g., ENT, Cardiology
    location: Optional[str] = None
    date: datetime = Field(default_factory=datetime.utcnow)
    diagnosis: Optional[str] = None
    notes: Optional[str] = None
    
    patient: User = Relationship(back_populates="visits")
    prescriptions: List["Prescription"] = Relationship(back_populates="visit")
    medications: List["Medication"] = Relationship(back_populates="visit")
    reports: List["Report"] = Relationship(back_populates="visit")

class Prescription(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    visit_id: int = Field(foreign_key="visit.id")
    medicine_name: str
    dosage: str
    frequency: str
    duration: str
    instructions: Optional[str] = None
    
    visit: Visit = Relationship(back_populates="prescriptions")

class Medication(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    visit_id: int = Field(foreign_key="visit.id")
    medicine_name: str
    dosage: str
    frequency: str
    start_date: datetime
    end_date: Optional[datetime] = None
    
    visit: Visit = Relationship(back_populates="medications")

class Report(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    visit_id: Optional[int] = Field(default=None, foreign_key="visit.id")
    patient_id: Optional[int] = Field(default=None, foreign_key="user.id")
    file_name: str
    file_type: str
    file_url: Optional[str] = None
    document_type: str  # diagnostic / prescription
    extracted_data: Optional[dict] = Field(default=None, sa_column=Column(JSON))
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)
    
    visit: Optional["Visit"] = Relationship(back_populates="reports")
      
class QRToken(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    token: str = Field(unique=True, index=True)
    patient_id: int = Field(foreign_key="user.id")
    access_type: str
    allowed_sections: str
    selected_report_ids: Optional[str] = None
    expires_at: datetime
    created_at: datetime = Field(default_factory=datetime.utcnow)
    used_at: Optional[datetime] = None