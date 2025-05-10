from fastapi import APIRouter, Depends
from schemas.log import LogIn, LogOut
from utils.auth import get_current_user
import uuid
from datetime import datetime

router = APIRouter()

@router.post("/", response_model=LogOut)
async def ingest_log(log: LogIn, user=Depends(get_current_user)):
    """Ingest a new log entry"""
    # TODO: Push to Kafka, store in DB
    return LogOut(
        id=str(uuid.uuid4()),
        project_id=log.projectId,
        event=log.event,
        source_type=log.sourceType,
        timestamp=log.timestamp or datetime.utcnow().isoformat(),
        metadata=log.metadata,
        created_at=datetime.utcnow().isoformat()
    )

@router.get("/")
async def get_all_logs(user=Depends(get_current_user)):
    print("[DEBUG] get_all_logs called")
    print(f"[DEBUG] user: {user}")
    """Get all logs (stub)"""
    # TODO: Query all logs from DB
    return []

@router.get("/{project_id}")
async def get_logs(project_id: uuid.UUID, user=Depends(get_current_user)):
    print(f"[DEBUG] get_logs called with project_id: {project_id}")
    print(f"[DEBUG] user: {user}")
    """Get logs for a project"""
    # TODO: Query logs from DB
    return [] 