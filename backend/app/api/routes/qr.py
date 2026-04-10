from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
import uuid
from datetime import datetime, timedelta
from app.api.deps import get_current_user
from app.db.session import get_session
from app.db.models import User, QRToken, Visit, Report
from app.schemas.qr import QRTokenCreate, QRTokenInDB, QRTokenValidate, SharedDataResponse, SharedVisit, SharedReport
from app.schemas.visit import VisitCreate, VisitInDB
from app.core.config import settings

router = APIRouter(prefix="/qr", tags=["qr"])

@router.post("/shared/{token}/visit", response_model=VisitInDB, status_code=status.HTTP_201_CREATED)
def create_visit_from_shared_token(
    token: str,
    visit_data: VisitCreate,
    session: Session = Depends(get_session)
):
    """
    Public endpoint for healthcare providers to register a clinical encounter 
    when viewing a patient's shared record.
    """
    qr_token = session.exec(select(QRToken).where(QRToken.token == token)).first()
    if not qr_token:
        raise HTTPException(status_code=404, detail="Shared record not found")
        
    if qr_token.expires_at < datetime.utcnow():
        raise HTTPException(status_code=410, detail="Shared record has expired")
        
    # Create the visit linked to the patient
    visit = Visit(
        patient_id=qr_token.patient_id,
        doctor_name=visit_data.doctor_name,
        hospital_name=visit_data.hospital_name,
        examine_area=visit_data.examine_area,
        location=visit_data.location,
        date=visit_data.date or datetime.utcnow(),
        diagnosis=visit_data.diagnosis,
        notes=visit_data.notes
    )
    
    session.add(visit)
    session.commit()
    session.refresh(visit)
    return visit

@router.post("/generate", response_model=QRTokenInDB, status_code=status.HTTP_201_CREATED)
def generate_qr_token(
    qr_data: QRTokenCreate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    token = str(uuid.uuid4())
    expires_at = datetime.utcnow() + timedelta(minutes=qr_data.expires_in_minutes)
    
    qr_token = QRToken(
        token=token,
        patient_id=current_user.id,
        access_type=qr_data.access_type,
        allowed_sections=qr_data.allowed_sections,
        selected_report_ids=qr_data.selected_report_ids,
        expires_at=expires_at
    )
    
    session.add(qr_token)
    session.commit()
    session.refresh(qr_token)
    return qr_token

@router.get("/shared/{token}", response_model=SharedDataResponse)
def get_shared_record(
    token: str,
    session: Session = Depends(get_session)
):
    qr_token = session.exec(select(QRToken).where(QRToken.token == token)).first()
    if not qr_token:
        raise HTTPException(status_code=404, detail="Shared record not found")
        
    if qr_token.expires_at < datetime.utcnow():
        raise HTTPException(status_code=410, detail="Shared record has expired")
        
    patient = session.get(User, qr_token.patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
        
    allowed_sections = qr_token.allowed_sections.split(',')
    
    response_data = {
        "full_name": patient.full_name,
        "expires_at": qr_token.expires_at,
        "allowed_sections": allowed_sections,
        "profile": None,
        "visits": [],
        "unlinked_reports": []
    }
    
    # Filter health profile data
    profile_data = {}
    has_profile_data = False
    
    if 'biometrics' in allowed_sections:
        has_profile_data = True
        profile_data.update({"age": patient.age, "sex": patient.sex, "blood_group": patient.blood_group, "height": patient.height, "weight": patient.weight})
        
    if 'vitals' in allowed_sections:
        has_profile_data = True
        profile_data.update({"hr": patient.hr, "bp": patient.bp, "resp_rate": patient.resp_rate, "spo2": patient.spo2})
        
    if 'lifestyle' in allowed_sections:
        has_profile_data = True
        profile_data.update({"steps_goal": patient.steps_goal, "sleep_goal": patient.sleep_goal, "activity_level": patient.activity_level, "water_intake_goal": patient.water_intake_goal})
        
    if 'history' in allowed_sections:
        has_profile_data = True
        profile_data.update({"primary_concerns": patient.primary_concerns, "family_history": patient.family_history})
        
    if has_profile_data:
        response_data["profile"] = profile_data
        
    # Medical Records (Visits, Prescriptions, Reports)
    if 'records' in allowed_sections:
        # Fetch all visits for the patient
        visits = session.exec(select(Visit).where(Visit.patient_id == patient.id).order_by(Visit.date.desc())).all()
        
        filtered_visits = []
        selected_ids = []
        if qr_token.selected_report_ids:
            selected_ids = [int(id_str) for id_str in qr_token.selected_report_ids.split(',') if id_str]

        for visit in visits:
            # Filter reports within the visit
            v_reports = [r for r in visit.reports if not selected_ids or r.id in selected_ids]
            
            # If the user selected specific reports, we only show the visit if it has at least one of those reports
            if not selected_ids or v_reports:
                # Use model_validate to convert SQLModel to Pydantic schema
                visit_schema = SharedVisit.model_validate(visit)
                # Override with filtered reports
                visit_schema.reports = [SharedReport.model_validate(r) for r in v_reports]
                filtered_visits.append(visit_schema)
        
        response_data["visits"] = filtered_visits

        # Standalone reports
        unlinked_reports = session.exec(
            select(Report)
            .where(Report.patient_id == patient.id)
            .where(Report.visit_id == None)
            .order_by(Report.uploaded_at.desc())
        ).all()
        
        filtered_unlinked = [SharedReport.model_validate(r) for r in unlinked_reports if not selected_ids or r.id in selected_ids]
        response_data["unlinked_reports"] = filtered_unlinked
        
    return response_data

@router.post("/validate", response_model=QRTokenInDB)
def validate_qr_token(
    qr_validate: QRTokenValidate,
    session: Session = Depends(get_session)
):
    qr_token = session.exec(select(QRToken).where(QRToken.token == qr_validate.token)).first()
    if not qr_token:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="QR token not found")
    
    if qr_token.used_at:
        raise HTTPException(status_code=status.HTTP_410_GONE, detail="QR token already used")
    
    if qr_token.expires_at < datetime.utcnow():
        raise HTTPException(status_code=status.HTTP_410_GONE, detail="QR token expired")
    
    return qr_token