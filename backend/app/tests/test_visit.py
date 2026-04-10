import pytest
from fastapi.testclient import TestClient
from sqlmodel import SQLModel, create_engine, Session
from sqlmodel.pool import StaticPool
from app.main import app
from app.db.session import get_session
from app.db.models import User
from app.core.security import get_password_hash

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

def test_create_visit(client: TestClient):
    response = client.post(
        "/visits",
        json={"diagnosis": "Common cold", "notes": "Patient has fever"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["diagnosis"] == "Common cold"
    assert data["notes"] == "Patient has fever"
    assert "id" in data

def test_get_patient_visits(client: TestClient):
    client.post("/visits", json={"diagnosis": "Visit 1"})
    client.post("/visits", json={"diagnosis": "Visit 2"})
    
    response = client.get("/visits")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert data[0]["diagnosis"] == "Visit 1"
    assert data[1]["diagnosis"] == "Visit 2"

def test_get_visit_by_id(client: TestClient):
    create_response = client.post("/visits", json={"diagnosis": "Test visit"})
    visit_id = create_response.json()["id"]
    
    response = client.get(f"/visits/{visit_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == visit_id
    assert data["diagnosis"] == "Test visit"

def test_get_nonexistent_visit(client: TestClient):
    response = client.get("/visits/999")
    assert response.status_code == 404
    assert "not found" in response.json()["detail"]

def test_add_prescription_to_visit(client: TestClient):
    visit_response = client.post("/visits", json={"diagnosis": "Test"})
    visit_id = visit_response.json()["id"]
    
    response = client.post(
        f"/visits/{visit_id}/prescriptions",
        json={
            "medicine_name": "Paracetamol",
            "dosage": "500mg",
            "frequency": "Every 6 hours",
            "duration": "3 days",
            "instructions": "Take after food"
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert data["medicine_name"] == "Paracetamol"
    assert data["dosage"] == "500mg"
    assert data["visit_id"] == visit_id

def test_add_prescription_to_nonexistent_visit(client: TestClient):
    response = client.post(
        "/visits/999/prescriptions",
        json={
            "medicine_name": "Medicine",
            "dosage": "100mg",
            "frequency": "Daily",
            "duration": "7 days"
        }
    )
    assert response.status_code == 404
    assert "not found" in response.json()["detail"]

def test_add_medication_to_visit(client: TestClient):
    visit_response = client.post("/visits", json={"diagnosis": "Test"})
    visit_id = visit_response.json()["id"]
    
    response = client.post(
        f"/visits/{visit_id}/medications",
        json={
            "medicine_name": "Antibiotic",
            "dosage": "250mg",
            "frequency": "Twice daily",
            "start_date": "2024-01-01T00:00:00"
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert data["medicine_name"] == "Antibiotic"
    assert data["dosage"] == "250mg"
    assert data["visit_id"] == visit_id