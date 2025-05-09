from fastapi import FastAPI
from routers import logs, reactions, complaints

app = FastAPI()

app.include_router(logs.router, prefix="/api/logs", tags=["logs"])
app.include_router(reactions.router, prefix="/api/reactions", tags=["reactions"])
app.include_router(complaints.router, prefix="/api/complaints", tags=["complaints"]) 