# Reflex Backend (FastAPI)

## Overview
This is the backend service for Reflex, built with FastAPI. It handles API requests, authentication, and integrates with Supabase for data storage and auth.

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

3. Run with Docker Compose:
   ```bash
   docker-compose up --build
   ```

4. Run FastAPI locally:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
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
- All secrets and environment variables should be set in the Render dashboard, never committed to code
- Use the Dockerfile for reproducible builds
- Monitor usage on Render's free tier (services may sleep after inactivity)

## Deployment: Render.com

### 1. Create a Render Account
- Go to [https://render.com/](https://render.com/) and sign up.

### 2. Create a New Web Service
- Click **New Web Service**.
- Connect your GitHub repo.
- Set the root directory to `apps/backend`.
- Choose **Docker** as the environment (Render will use your Dockerfile).

### 3. Set Environment Variables
- In the Render dashboard, add the following environment variables:
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `POSTGRES_PASSWORD` (if needed)
  - `REDIS_URL` (if needed)
- These should match your `.env.template` and Supabase project settings.

### 4. Deploy
- Click **Create Web Service**.
- Render will build and deploy your FastAPI app.
- After deployment, note your backend URL (e.g., `https://your-backend.onrender.com`).

### 5. Update Frontend API URL
- Update your frontend (Vercel) to use the new Render backend URL for API requests.
- Set `NEXT_PUBLIC_API_URL` in your frontend environment variables.

## Migrated from Fly.io
- This project was previously configured for Fly.io. All deployment instructions now reference Render. 