# Reflex Infra

This directory contains infrastructure configuration for local development and testing of the Reflex observability platform.

## Services

- **backend**: FastAPI app (apps/backend), exposes API on port 8000
- **kafka**: Redpanda (Kafka-compatible) for log/event ingestion
- **postgres**: Postgres database (Supabase-compatible), stores structured logs and app data
- **redis**: Redis for Celery background tasks and caching

## Usage

1. Copy `.env.template` to `.env` in `apps/backend/` and fill in required environment variables (Supabase keys, DB URL, etc).
2. Start all services:
   ```bash
   docker-compose up --build
   ```
3. The FastAPI backend will be available at http://localhost:8000
4. Kafka (Redpanda) will be available at localhost:9092
5. Postgres will be available at localhost:5432 (user: supabase, password: supabase)
6. Redis will be available at localhost:6379

## Notes
- This stack is for local development only. For production, use managed services or production-grade orchestration (e.g., Fly.io, managed Kafka, managed Postgres).
- The backend service depends on Kafka, Postgres, and Redis being available.
- You can add additional services (Grafana, Prometheus, etc.) as needed for observability. 