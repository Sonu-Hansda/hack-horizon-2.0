from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
import os
import shutil
from sqlmodel import Session, select
from app.api.deps import get_current_user
from app.db.session import get_session
from app.db.models import User, Visit, Prescription, Medication, Report
from app.schemas.visit import (
    VisitCreate, VisitInDB, VisitUpdate, VisitWithRelations,
    PrescriptionCreate, PrescriptionInDB,
    MedicationCreate, MedicationInDB,
    ReportCreate, ReportInDB
)
from app.core.config import settings
from datetime import datetime

router = APIRouter(prefix="/visits", tags=["visits"])

@router.post("", response_model=VisitInDB, status_code=status.HTTP_201_CREATED)
def create_visit(
    visit_data: VisitCreate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    visit = Visit(
        patient_id=current_user.id,
        diagnosis=visit_data.diagnosis,
        notes=visit_data.notes
    )
    
    session.add(visit)
    session.commit()
    session.refresh(visit)
    return visit

@router.get("", response_model=list[VisitInDB])
def get_patient_visits(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    visits = session.exec(select(Visit).where(Visit.patient_id == current_user.id)).all()
    return visits

@router.get("/{visit_id}", response_model=VisitWithRelations)
def get_visit_by_id(
    visit_id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    visit = session.get(Visit, visit_id)
    if not visit:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Visit not found"
        )
    
    if visit.patient_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this visit"
        )
    
    return visit

@router.post("/{visit_id}/prescriptions", response_model=PrescriptionInDB, status_code=status.HTTP_201_CREATED)
def add_prescription_to_visit(
    visit_id: int,
    prescription_data: PrescriptionCreate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    visit = session.get(Visit, visit_id)
    if not visit or visit.patient_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Visit not found or not authorized"
        )
    
    prescription = Prescription(
        visit_id=visit_id,
        medicine_name=prescription_data.medicine_name,
        dosage=prescription_data.dosage,
        frequency=prescription_data.frequency,
        duration=prescription_data.duration,
        instructions=prescription_data.instructions
    )
    
    session.add(prescription)
    session.commit()
    session.refresh(prescription)
    return prescription

@router.post("/{visit_id}/medications", response_model=MedicationInDB, status_code=status.HTTP_201_CREATED)
def add_medication_to_visit(
    visit_id: int,
    medication_data: MedicationCreate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    visit = session.get(Visit, visit_id)
    if not visit or visit.patient_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Visit not found or not authorized"
        )
    
    medication = Medication(
        visit_id=visit_id,
        medicine_name=medication_data.medicine_name,
        dosage=medication_data.dosage,
        frequency=medication_data.frequency,
        start_date=medication_data.start_date,
        end_date=medication_data.end_date
    )
    
    session.add(medication)
    session.commit()
    session.refresh(medication)
    return medication

@router.post("/{visit_id}/reports", response_model=ReportInDB, status_code=status.HTTP_201_CREATED)
async def upload_report_to_visit(
    visit_id: int,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    visit = session.get(Visit, visit_id)
    if not visit or visit.patient_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Visit not found or not authorized"
        )
    
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{datetime.utcnow().timestamp()}_{file.filename}"
    file_path = os.path.join(settings.UPLOAD_DIR, unique_filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    report = Report(
        visit_id=visit_id,
        file_url=f"/uploads/{unique_filename}",
        file_name=file.filename,
        file_type=file.content_type
    )
    
    session.add(report)
    session.commit()
    session.refresh(report)
    return report