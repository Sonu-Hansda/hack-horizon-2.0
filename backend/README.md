# Digital Health Record Platform Backend

A production-grade backend for a patient-centric digital health record platform built with FastAPI, SQLModel, and JWT authentication.

## Features

- **Authentication**: JWT-based user signup/login with password hashing
- **Patient Management**: Create, read, update patient profiles
- **Visit Management**: Create visits, add prescriptions, medications, reports
- **Doctor Flow**: QR-based temporary access for doctors
- **QR Access System**: Secure token generation and validation
- **File Upload**: Upload medical reports (PDF/images)
- **Summary Generation**: Generate visit summaries from prescriptions, medications, reports
- **Permissions**: Role-based access control

## Tech Stack

- **FastAPI**: Modern, fast web framework
- **SQLModel**: SQLAlchemy + Pydantic for type-safe ORM
- **SQLite**: Development database (PostgreSQL-ready)
- **JWT**: JSON Web Token authentication
- **Alembic**: Database migrations
- **Pydantic**: Data validation and settings management
- **bcrypt**: Password hashing

## Project Structure

```
app/
├── main.py              # FastAPI application entry point
├── core/
│   ├── config.py       # Configuration settings
│   └── security.py     # JWT and password utilities
├── db/
│   ├── session.py      # Database session management
│   └── models.py       # SQLModel database models
├── schemas/
│   ├── user.py         # Pydantic schemas for users
│   ├── doctor.py       # Schemas for doctors
│   ├── visit.py        # Schemas for visits and related data
│   └── qr.py           # Schemas for QR tokens
├── api/
│   ├── deps.py         # FastAPI dependencies
│   └── routes/
│       ├── auth.py     # Authentication endpoints
│       ├── patient.py  # Patient endpoints
│       ├── visit.py    # Visit endpoints
│       ├── doctor.py   # Doctor endpoints
│       └── qr.py       # QR token endpoints
├── services/
│   ├── summary_service.py  # Visit summary generation
│   └── qr_service.py       # QR token utilities
├── utils/
│   └── permissions.py  # Permission checking utilities
└── tests/
    ├── test_auth.py    # Authentication tests
    ├── test_visit.py   # Visit tests
    └── test_qr.py      # QR token tests
```

## API Endpoints

### Authentication
- `POST /auth/signup` - Register new patient
- `POST /auth/login` - Login and get JWT token

### Patients
- `GET /patients/me` - Get current patient profile
- `PUT /patients/me` - Update patient profile

### Visits
- `POST /visits` - Create new visit
- `GET /visits` - Get all visits for current patient
- `GET /visits/{id}` - Get specific visit
- `POST /visits/{id}/prescriptions` - Add prescription to visit
- `POST /visits/{id}/medications` - Add medication to visit
- `POST /visits/{id}/reports` - Upload report to visit

### Doctors
- `POST /doctors` - Create doctor profile
- `POST /doctors/qr-visit` - Create visit using QR token

### QR Tokens
- `POST /qr/generate` - Generate QR token for doctor access
- `POST /qr/validate` - Validate QR token

## Setup

1. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure environment**:
   Copy `.env.example` to `.env` and update values:
   ```bash
   cp .env.example .env
   ```

3. **Run the application**:
   ```bash
   uvicorn app.main:app --reload
   ```

4. **Access API documentation**:
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

## Testing

Run tests with pytest:
```bash
pytest app/tests/
```

## Database Migrations

The project uses SQLModel's automatic table creation. For production with Alembic:

1. Initialize Alembic:
   ```bash
   alembic init alembic
   ```

2. Configure `alembic.ini` to use your database URL

3. Generate and run migrations:
   ```bash
   alembic revision --autogenerate -m "Initial migration"
   alembic upgrade head
   ```

## Security Features

- **JWT Authentication**: All protected endpoints require Bearer token
- **Password Hashing**: bcrypt for secure password storage
- **QR Token Security**: Time-limited, single-use tokens
- **Ownership Validation**: Patients can only access their own data
- **Input Validation**: Pydantic schemas for all request/response data

## File Upload

- Files are stored locally in `./uploads` directory (development)
- Ready for S3 integration in production
- Supports PDF and image files
- Unique filenames to prevent collisions

## QR Token System

- **Token Generation**: UUID-based secure tokens
- **Expiration**: Configurable (10min/30min/1hr default)
- **Access Control**: Full/partial access types
- **Single Use**: Tokens marked as used after first access
- **Validation**: Automatic expiration and usage checking

## Development

- **Hot Reload**: Uvicorn with --reload flag
- **SQLite Database**: File-based for easy development
- **Environment Variables**: Configuration via .env file
- **Type Hints**: Full type support throughout codebase

## Production Considerations

1. **Database**: Switch to PostgreSQL in production
2. **File Storage**: Integrate with S3 or cloud storage
3. **CORS**: Configure proper origins in production
4. **HTTPS**: Always use HTTPS in production
5. **Secrets**: Use proper secret management for JWT keys
6. **Monitoring**: Add logging and monitoring
7. **Scaling**: Consider async database drivers for high load