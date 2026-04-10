from fastapi import HTTPException, status
from sqlmodel import Session, select
from app.db.models import User, Visit, QRToken
from datetime import datetime

def check_patient_ownership(user: User, visit_id: int, session: Session) -> Visit:
    visit = session.get(Visit, visit_id)
    if not visit:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Visit not found"
        )
    
    if visit.patient_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this visit"
        )
    
    return visit

def check_qr_token_access(token: str, session: Session) -> QRToken:
    qr_token = session.exec(select(QRToken).where(QRToken.token == token)).first()
    if not qr_token:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="QR token not found"
        )
    
    if qr_token.used_at:
        raise HTTPException(
            status_code=status.HTTP_410_GONE,
            detail="QR token already used"
        )
    
    if qr_token.expires_at < datetime.utcnow():
        raise HTTPException(
            status_code=status.HTTP_410_GONE,
            detail="QR token expired"
        )
    
    return qr_token

def check_access_to_section(qr_token: QRToken, section: str) -> bool:
    allowed_sections = qr_token.allowed_sections.split(",")
    return section in allowed_sections or "full" in allowed_sections