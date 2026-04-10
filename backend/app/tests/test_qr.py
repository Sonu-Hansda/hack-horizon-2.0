import pytest
from fastapi.testclient import TestClient
from sqlmodel import SQLModel, create_engine, Session, select
from sqlmodel.pool import StaticPool
import sys
import os

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.main import app
from app.db.session import get_session
from app.db.models import User, QRToken
from app.core.security import get_password_hash
from datetime import datetime, timedelta

@pytest.fixture(name="session")
def session_fixture():
    engine = create_engine(
        "sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool
    )
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        yield session

@pytest.fixture(name="client")
def client_fixture(session: Session):
    def get_session_override():
        return session
    
    app.dependency_overrides[get_session] = get_session_override
    
    user = User(
        email="test@example.com",
        hashed_password=get_password_hash("password123"),
        full_name="Test User"
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    
    client = TestClient(app)
    
    login_response = client.post(
        "/auth/login",
        data={"username": "test@example.com", "password": "password123"}
    )
    token = login_response.json()["access_token"]
    client.headers = {"Authorization": f"Bearer {token}"}
    
    yield client
    app.dependency_overrides.clear()

def test_generate_qr_token(client: TestClient):
    response = client.post(
        "/qr/generate",
        json={
            "access_type": "full",
            "allowed_sections": "prescriptions,medications",
            "expires_in_minutes": 30
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert "token" in data
    assert data["access_type"] == "full"
    assert data["allowed_sections"] == "prescriptions,medications"
    assert "expires_at" in data

def test_validate_valid_qr_token(client: TestClient, session: Session):
    generate_response = client.post(
        "/qr/generate",
        json={
            "access_type": "partial",
            "allowed_sections": "prescriptions"
        }
    )
    token = generate_response.json()["token"]
    
    response = client.post("/qr/validate", json={"token": token})
    assert response.status_code == 200
    data = response.json()
    assert data["token"] == token
    assert data["access_type"] == "partial"

def test_validate_nonexistent_qr_token(client: TestClient):
    response = client.post("/qr/validate", json={"token": "nonexistent-token"})
    assert response.status_code == 404
    assert "not found" in response.json()["detail"]

def test_validate_expired_qr_token(client: TestClient, session: Session):
    user = session.exec(select(User).where(User.email == "test@example.com")).first()
    
    expired_token = QRToken(
        token="expired-token",
        patient_id=user.id,
        access_type="full",
        allowed_sections="all",
        expires_at=datetime.utcnow() - timedelta(hours=1)
    )
    session.add(expired_token)
    session.commit()
    
    response = client.post("/qr/validate", json={"token": "expired-token"})
    assert response.status_code == 410
    assert "expired" in response.json()["detail"]

def test_validate_used_qr_token(client: TestClient, session: Session):
    user = session.exec(select(User).where(User.email == "test@example.com")).first()
    
    used_token = QRToken(
        token="used-token",
        patient_id=user.id,
        access_type="full",
        allowed_sections="all",
        expires_at=datetime.utcnow() + timedelta(hours=1),
        used_at=datetime.utcnow()
    )
    session.add(used_token)
    session.commit()
    
    response = client.post("/qr/validate", json={"token": "used-token"})
    assert response.status_code == 410
    assert "already used" in response.json()["detail"]

def test_doctor_create_visit_with_qr(client: TestClient, session: Session):
    generate_response = client.post(
        "/qr/generate",
        json={
            "access_type": "full",
            "allowed_sections": "all"
        }
    )
    qr_token = generate_response.json()["token"]
    
    doctor_response = client.post(
        "/doctors",
        json={
            "name": "Dr. Smith",
            "hospital": "City Hospital",
            "license_number": "MED12345"
        }
    )
    doctor_id = doctor_response.json()["id"]
    
    client.headers = {}
    
    response = client.post(
        "/doctors/qr-visit",
        params={"qr_token": qr_token, "doctor_id": doctor_id},
        json={"diagnosis": "Test diagnosis", "notes": "Test notes"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["diagnosis"] == "Test diagnosis"
    assert data["notes"] == "Test notes"
    
    qr_token_obj = session.exec(
        select(QRToken).where(QRToken.token == qr_token)
    ).first()
    assert qr_token_obj.used_at is not None