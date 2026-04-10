from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException, status
import shutil, os
from typing import Optional, List
from sqlmodel import Session, select
from datetime import datetime

from app.db.session import get_session
from app.db.models import Report, User
from app.api.deps import get_current_user
from app.services.report_pipeline import process_report

router = APIRouter(prefix="/reports", tags=["reports"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/me", response_model=List[dict])
async def get_my_reports(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    try:
        statement = select(Report).where(Report.patient_id == current_user.id).order_by(Report.uploaded_at.desc())
        results = session.exec(statement).all()
        
        reports = []
        for report in results:
            reports.append({
                "id": report.id,
                "visit_id": report.visit_id,
                "file_name": report.file_name,
                "file_type": report.file_type,
                "file_url": report.file_url,
                "document_type": report.document_type,
                "extracted_data": report.extracted_data,
                "uploaded_at": report.uploaded_at.isoformat() if report.uploaded_at else None
            })
        
        return reports
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching reports: {str(e)}")

@router.get("", response_model=List[dict])
async def get_reports(
    session: Session = Depends(get_session),
    skip: int = 0,
    limit: int = 100
):
    try:
        statement = select(Report).offset(skip).limit(limit)
        results = session.exec(statement).all()
        
        reports = []
        for report in results:
            reports.append({
                "id": report.id,
                "visit_id": report.visit_id,
                "file_name": report.file_name,
                "file_type": report.file_type,
                "file_url": report.file_url,
                "document_type": report.document_type,
                "extracted_data": report.extracted_data,
                "uploaded_at": report.uploaded_at.isoformat() if report.uploaded_at else None
            })
        
        return reports
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching reports: {str(e)}")

@router.get("/{report_id}", response_model=dict)
async def get_report(
    report_id: int,
    session: Session = Depends(get_session)
):
    """Get a specific report by ID"""
    try:
        report = session.get(Report, report_id)
        if not report:
            raise HTTPException(status_code=404, detail="Report not found")
        
        return {
            "id": report.id,
            "visit_id": report.visit_id,
            "file_name": report.file_name,
            "file_type": report.file_type,
            "file_url": report.file_url,
            "document_type": report.document_type,
            "extracted_data": report.extracted_data,
            "uploaded_at": report.uploaded_at.isoformat() if report.uploaded_at else None
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching report: {str(e)}")

@router.post("/process-report")
async def process_report_api(
    file: UploadFile = File(...), 
    session: Session = Depends(get_session), 
    document_type: str = Form(...),
    visit_id: Optional[int] = Form(None),
    current_user: User = Depends(get_current_user)
):
    # Unique filename to prevent collisions and fix URL visibility
    unique_filename = f"{datetime.utcnow().timestamp()}_{file.filename}"
    file_path = f"{UPLOAD_DIR}/{unique_filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = process_report(file_path, document_type)

    report = Report(
        file_name=file.filename,
        file_type=file.content_type,
        file_url=f"/uploads/{unique_filename}",
        document_type=result.get("document_type"),
        extracted_data=result.get("extracted_data"),
        visit_id=visit_id,
        patient_id=current_user.id
    )

    session.add(report)
    session.commit()
    session.refresh(report)

    return {
        "report_id": report.id,
        "data": result,
        "file_url": report.file_url
    }
