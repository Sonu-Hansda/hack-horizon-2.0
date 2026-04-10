from fastapi import APIRouter, UploadFile, File, Form, Depends
import shutil, os
from typing import Optional

from sqlmodel import Session
from app.db.session import get_session
from app.db.models import Report

from app.services.report_pipeline import process_report

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/process-report")
async def process_report_api(
    file: UploadFile = File(...), 
    session: Session = Depends(get_session), 
    document_type: str = Form(...),
    visit_id: Optional[int] = Form(None)
):
    file_path = f"{UPLOAD_DIR}/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = process_report(file_path, document_type)

    report = Report(
        file_name=file.filename,
        file_type=file.content_type,
        document_type=result.get("document_type"),
        extracted_data=result.get("extracted_data"),
        visit_id=visit_id
    )

    session.add(report)
    session.commit()
    session.refresh(report)

    return {
        "report_id": report.id,
        "data": result
    }
