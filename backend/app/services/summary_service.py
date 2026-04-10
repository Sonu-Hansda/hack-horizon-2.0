from sqlmodel import Session, select
from app.db.models import Visit, Prescription, Medication, Report
from datetime import datetime
from typing import Dict, Any

def generate_visit_summary(visit_id: int, session: Session) -> Dict[str, Any]:
    visit = session.get(Visit, visit_id)
    if not visit:
        raise ValueError("Visit not found")
    
    prescriptions = session.exec(select(Prescription).where(Prescription.visit_id == visit_id)).all()
    medications = session.exec(select(Medication).where(Medication.visit_id == visit_id)).all()
    reports = session.exec(select(Report).where(Report.visit_id == visit_id)).all()
    
    summary = {
        "visit_id": visit.id,
        "date": visit.date.isoformat() if visit.date else None,
        "diagnosis": visit.diagnosis,
        "notes": visit.notes,
        "prescriptions": [
            {
                "medicine_name": p.medicine_name,
                "dosage": p.dosage,
                "frequency": p.frequency,
                "duration": p.duration,
                "instructions": p.instructions
            }
            for p in prescriptions
        ],
        "medications": [
            {
                "medicine_name": m.medicine_name,
                "dosage": m.dosage,
                "frequency": m.frequency,
                "start_date": m.start_date.isoformat() if m.start_date else None,
                "end_date": m.end_date.isoformat() if m.end_date else None
            }
            for m in medications
        ],
        "reports": [
            {
                "file_name": r.file_name,
                "file_type": r.file_type,
                "uploaded_at": r.uploaded_at.isoformat() if r.uploaded_at else None
            }
            for r in reports
        ],
        "summary_text": _generate_summary_text(visit, prescriptions, medications, reports)
    }
    
    return summary

def _generate_summary_text(visit, prescriptions, medications, reports) -> str:
    summary_parts = []
    
    if visit.diagnosis:
        summary_parts.append(f"Diagnosis: {visit.diagnosis}")
    
    if visit.notes:
        summary_parts.append(f"Notes: {visit.notes}")
    
    if prescriptions:
        summary_parts.append("Prescriptions:")
        for p in prescriptions:
            summary_parts.append(f"  - {p.medicine_name}: {p.dosage}, {p.frequency}, {p.duration}")
            if p.instructions:
                summary_parts.append(f"    Instructions: {p.instructions}")
    
    if medications:
        summary_parts.append("Medications:")
        for m in medications:
            summary_parts.append(f"  - {m.medicine_name}: {m.dosage}, {m.frequency}")
            if m.end_date:
                summary_parts.append(f"    From {m.start_date.date()} to {m.end_date.date()}")
            else:
                summary_parts.append(f"    Started on {m.start_date.date()}")
    
    if reports:
        summary_parts.append(f"Reports: {len(reports)} file(s) attached")
    
    return "\n".join(summary_parts)