from fastapi import APIRouter, Depends, Form
from sqlmodel import Session
from app.db.session import get_session
from app.db.models import Report
from app.services.report_chat_service import chat_with_report

router = APIRouter()

@router.post("/report/{report_id}/chat")
def chat_report(
    report_id: int,
    question: str = Form(...),
    session: Session = Depends(get_session)
):
    report = session.get(Report, report_id)

    if not report:
        return {"error": "Report not found"}

    if not report.extracted_data:
        return {"error": "No extracted data available"}

    answer = chat_with_report(report.document_type, report.extracted_data, question)

    return {
        "question": question,
        "answer": answer
    }
