from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select, desc, func
from typing import List, Dict, Any
from datetime import datetime, timedelta
from app.db.session import get_session
from app.db.models import User, Visit, Report
from app.api.deps import get_current_user

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("/summary")
async def get_dashboard_summary(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Returns a unified summary for the user dashboard including stats,
    recent activity, and vital signs.
    """
    # 1. Vital Signs Snapshot
    vitals = {
        "hr": current_user.hr,
        "bp": current_user.bp,
        "resp_rate": current_user.resp_rate,
        "spo2": current_user.spo2,
        "last_updated": current_user.created_at.isoformat() # Using created_at or needs a specific last_vitals_update?
    }

    # 2. Stats Calculation
    # Total reports
    total_reports = session.exec(
        select(func.count()).select_from(Report).where(Report.patient_id == current_user.id)
    ).one()

    # Recent activity count (30 days)
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    recent_reports = session.exec(
        select(func.count())
        .select_from(Report)
        .where(Report.patient_id == current_user.id)
        .where(Report.uploaded_at >= thirty_days_ago)
    ).one()

    recent_visits = session.exec(
        select(func.count())
        .select_from(Visit)
        .where(Visit.patient_id == current_user.id)
        .where(Visit.date >= thirty_days_ago)
    ).one()

    # Active medications (from latest report if it's a prescription)
    active_meds = 0
    latest_prescription = session.exec(
        select(Report)
        .where(Report.patient_id == current_user.id)
        .where(Report.document_type == "prescription")
        .order_by(desc(Report.uploaded_at))
    ).first()
    
    if latest_prescription and latest_prescription.extracted_data:
        active_meds = len(latest_prescription.extracted_data.get("medications", []))

    # 3. Unified Activity Stream (Top 5)
    # Get recent visits
    recent_visit_data = session.exec(
        select(Visit)
        .where(Visit.patient_id == current_user.id)
        .order_by(desc(Visit.date))
        .limit(5)
    ).all()

    # Get recent reports
    recent_report_data = session.exec(
        select(Report)
        .where(Report.patient_id == current_user.id)
        .order_by(desc(Report.uploaded_at))
        .limit(5)
    ).all()

    activities = []
    
    for v in recent_visit_data:
        activities.append({
            "id": f"visit_{v.id}",
            "type": "visit",
            "title": v.diagnosis or "Clinical Visit",
            "description": f"Encounter with {v.doctor_name or 'Healthcare Professional'} at {v.hospital_name or 'Medical Center'}.",
            "time": v.date.isoformat(),
            "tags": ["VISIT", (v.examine_area or "General").upper()]
        })

    for r in recent_report_data:
        activities.append({
            "id": f"report_{r.id}",
            "type": "report",
            "title": f"New {r.document_type.title()} Uploaded",
            "description": f"Successfully processed '{r.file_name}'. Access available in records.",
            "time": r.uploaded_at.isoformat(),
            "tags": ["RECORD", r.document_type.upper()]
        })

    # Sort by time and pick top 5
    activities.sort(key=lambda x: x["time"], reverse=True)
    final_activities = activities[:5]

    return {
        "vitals": vitals,
        "stats": {
            "total_reports": total_reports,
            "recent_activity_count": recent_reports + recent_visits,
            "active_medications": active_meds
        },
        "activities": final_activities,
        "profile_completion": 100 if all([current_user.age, current_user.sex, current_user.blood_group]) else 65
    }
