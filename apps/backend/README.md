# Reflex Backend

## Overview
FastAPI-based backend service for Reflex, handling log ingestion, reaction rules, and complaint management.

## Tech Stack
- **Framework**: FastAPI
- **Message Queue**: Kafka (Redpanda)
- **Task Queue**: Celery (Redis)
- **Database**: Supabase (Postgres)
- **Testing**: pytest

## Development Setup

### Prerequisites
- Python 3.9+
- Docker & Docker Compose
- Redis (for Celery)
- Kafka (Redpanda)

### Local Development
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

3. Run the development server:
   ```bash
   uvicorn main:app --reload
   ```

### Running Tests
```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=apps/backend/

# Run specific test file
pytest tests/test_logs.py
```

## API Endpoints

### Logs
- `POST /api/logs/` - Ingest new log
- `GET /api/logs/` - Retrieve logs with filters

### Reactions
- `POST /api/reactions/` - Create reaction rule
- `GET /api/reactions/{project_id}` - Get project reactions
- `PATCH /api/reactions/{id}` - Update reaction
- `DELETE /api/reactions/{id}` - Delete reaction

### Complaints
- `GET /api/complaints/{project_id}` - Get project complaints
- `GET /api/complaints/{id}` - Get complaint details
- `PATCH /api/complaints/{id}` - Update complaint status

## Project Structure
```
apps/backend/
├── main.py              # FastAPI application
├── routers/            # API route handlers
├── services/           # Business logic
├── models/            # Pydantic models
├── utils/             # Helper functions
└── tests/             # Test files
```

## SRE/DevOps Notes
- Prometheus metrics exposed at `/metrics`
- Structured logging with correlation IDs
- Health check endpoint at `/health`
- Rate limiting on all endpoints
- CORS configured for frontend domain

## Deployment
- CI/CD via GitHub Actions
- Deployed to Fly.io
- Environment variables managed in Fly.io dashboard
- Database migrations run automatically on deploy 