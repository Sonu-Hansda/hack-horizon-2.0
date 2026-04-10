from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlmodel import Session, select
from app.core.security import decode_token
from app.db.session import get_session
from app.db.models import User, QRToken
from datetime import datetime

security = HTTPBearer()

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    session: Session = Depends(get_session)
):
    token = credentials.credentials
    payload = decode_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
    
    email = payload.get("sub")
    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    
    user = session.exec(select(User).where(User.email == email)).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    
    return user

def get_qr_token(
    token: str,
    session: Session = Depends(get_session)
):
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