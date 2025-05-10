from fastapi import FastAPI, Request
from routers import logs, reactions, complaints
import os

app = FastAPI()

@app.middleware("http")
async def log_requests(request: Request, call_next):
    print(f"[MIDDLEWARE DEBUG] {request.method} {request.url}")
    print(f"[MIDDLEWARE DEBUG] Headers: {dict(request.headers)}")
    response = await call_next(request)
    return response

app.include_router(logs.router, prefix="/api/logs", tags=["logs"])
app.include_router(reactions.router, prefix="/api/reactions", tags=["reactions"])
app.include_router(complaints.router, prefix="/api/complaints", tags=["complaints"]) 

@app.get("/healthz")
def health_check():
    return {"status": "ok"}

@app.get("/")
def root():
    return {"message": "Reflex API is running"}

# Basic info endpoint
@app.get("/info")
def info():
    return {
        "name": "Reflex API",
        "description": "Real-time observability and reactions platform",
        "author": "Your Name or Org",
        "environment": os.getenv("ENV", "development")
    }

# Version endpoint (populate from env or tag in CI)
@app.get("/version")
def version():
    return {
        "version": os.getenv("APP_VERSION", "0.1.0"),
        "commit": os.getenv("GIT_COMMIT_SHA", "local-dev")
    }