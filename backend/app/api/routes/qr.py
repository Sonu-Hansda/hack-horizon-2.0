from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
import uuid
from datetime import datetime, timedelta
from app.api.deps import get_current_user
from app.db.session import get_session
from app.db.models import User, QRToken
from app.schemas.qr import QRTokenCreate, QRTokenInDB, QRTokenValidate
from app.core.config import settings

router = APIRouter(prefix="/qr", tags=["qr"])

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
        expires_at=expires_at
    )
    
    session.add(qr_token)
    session.commit()
    session.refresh(qr_token)
    return qr_token

@router.post("/validate", response_model=QRTokenInDB)
def validate_qr_token(
    qr_validate: QRTokenValidate,
    session: Session = Depends(get_session)
):
    qr_token = session.exec(select(QRToken).where(QRToken.token == qr_validate.token)).first()
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