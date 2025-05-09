from fastapi import FastAPI
from routers import logs, reactions, complaints

app = FastAPI()

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