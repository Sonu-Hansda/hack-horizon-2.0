from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.api.routes import auth, patient, visit, doctor, qr, report
from app.db.session import create_db_and_tables
from app.core.config import settings
import os

app = FastAPI(title="Digital Health Record Platform", version="1.0.0")

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(patient.router)
app.include_router(visit.router)
app.include_router(doctor.router)
app.include_router(qr.router)
app.include_router(report.router)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)

@app.get("/")
def read_root():
    return {"message": "Digital Health Record Platform API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}