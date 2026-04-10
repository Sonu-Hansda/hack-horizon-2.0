from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.api.deps import get_qr_token
from app.db.session import get_session
from app.db.models import Doctor, Visit, QRToken
from app.schemas.doctor import DoctorCreate, DoctorInDB
from app.schemas.visit import VisitCreate, VisitInDB
from datetime import datetime

router = APIRouter(prefix="/doctors", tags=["doctors"])

@router.post("", response_model=DoctorInDB, status_code=status.HTTP_201_CREATED)
def create_doctor(
    doctor_data: DoctorCreate,
    session: Session = Depends(get_session)
):
    doctor = Doctor(
        name=doctor_data.name,
        hospital=doctor_data.hospital,
        license_number=doctor_data.license_number
    )
    
    session.add(doctor)
    session.commit()
    session.refresh(doctor)
    return doctor

@router.post("/qr-visit", response_model=VisitInDB, status_code=status.HTTP_201_CREATED)
def create_visit_via_qr(
    visit_data: VisitCreate,
    qr_token: str,
    doctor_id: int,
    session: Session = Depends(get_session)
):
    qr_token_obj = get_qr_token(qr_token, session)
    
    doctor = session.get(Doctor, doctor_id)
    if not doctor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Doctor not found"
        )
    
    visit = Visit(
        patient_id=qr_token_obj.patient_id,
        doctor_id=doctor_id,
        diagnosis=visit_data.diagnosis,
        notes=visit_data.notes
    )
    
    qr_token_obj.used_at = datetime.utcnow()
    
    session.add(visit)
    session.add(qr_token_obj)
    session.commit()
    session.refresh(visit)
    return visit