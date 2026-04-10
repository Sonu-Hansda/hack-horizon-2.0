import uuid
from datetime import datetime, timedelta
from sqlmodel import Session, select
from app.db.models import QRToken
from app.core.config import settings

def generate_qr_token(patient_id: int, access_type: str, allowed_sections: str, expires_in_minutes: int = None) -> str:
    token = str(uuid.uuid4())
    expires_at = datetime.utcnow() + timedelta(
        minutes=expires_in_minutes or settings.QR_TOKEN_EXPIRE_MINUTES
    )
    return token, expires_at

def validate_qr_token(token: str, session: Session) -> QRToken:
    qr_token = session.exec(select(QRToken).where(QRToken.token == token)).first()
    if not qr_token:
        return None
    
    if qr_token.used_at or qr_token.expires_at < datetime.utcnow():
        return None
    
    return qr_token

def mark_qr_token_used(token: str, session: Session) -> bool:
    qr_token = session.exec(select(QRToken).where(QRToken.token == token)).first()
    if not qr_token:
        return False
    
    qr_token.used_at = datetime.utcnow()
    session.add(qr_token)
    session.commit()
    return True