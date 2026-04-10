from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.api.deps import get_current_user
from app.db.session import get_session
from app.db.models import User
from app.schemas.user import UserInDB, UserUpdate

router = APIRouter(prefix="/patients", tags=["patients"])

@router.get("/me", response_model=UserInDB)
def get_current_patient_profile(current_user: User = Depends(get_current_user)):
    return current_user

@router.put("/me", response_model=UserInDB)
def update_patient_profile(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    update_data = user_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(current_user, field, value)
    
    session.add(current_user)
    session.commit()
    session.refresh(current_user)
    return current_user