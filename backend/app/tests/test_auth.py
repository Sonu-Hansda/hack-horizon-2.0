import pytest
from fastapi.testclient import TestClient
from sqlmodel import SQLModel, create_engine, Session
from sqlmodel.pool import StaticPool
from app.main import app
from app.db.session import get_session

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
    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()

def test_signup_success(client: TestClient):
    response = client.post(
        "/auth/signup",
        json={
            "email": "test@example.com",
            "password": "password123",
            "full_name": "Test User",
            "phone": "1234567890"
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "test@example.com"
    assert data["full_name"] == "Test User"
    assert "id" in data
    assert "hashed_password" not in data

def test_signup_duplicate_email(client: TestClient):
    client.post(
        "/auth/signup",
        json={
            "email": "test@example.com",
            "password": "password123",
            "full_name": "Test User"
        }
    )
    
    response = client.post(
        "/auth/signup",
        json={
            "email": "test@example.com",
            "password": "password456",
            "full_name": "Another User"
        }
    )
    assert response.status_code == 400
    assert "already registered" in response.json()["detail"]

def test_login_success(client: TestClient):
    client.post(
        "/auth/signup",
        json={
            "email": "test@example.com",
            "password": "password123",
            "full_name": "Test User"
        }
    )
    
    response = client.post(
        "/auth/login",
        data={"username": "test@example.com", "password": "password123"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_login_invalid_credentials(client: TestClient):
    client.post(
        "/auth/signup",
        json={
            "email": "test@example.com",
            "password": "password123",
            "full_name": "Test User"
        }
    )
    
    response = client.post(
        "/auth/login",
        data={"username": "test@example.com", "password": "wrongpassword"}
    )
    assert response.status_code == 401
    assert "Incorrect email or password" in response.json()["detail"]

def test_login_nonexistent_user(client: TestClient):
    response = client.post(
        "/auth/login",
        data={"username": "nonexistent@example.com", "password": "password123"}
    )
    assert response.status_code == 401
    assert "Incorrect email or password" in response.json()["detail"]