from fastapi import APIRouter, Depends
from schemas.log import LogIn, LogOut
from utils.auth import get_current_user

router = APIRouter()

@router.post("/", response_model=LogOut)
def ingest_log(log: LogIn, user=Depends(get_current_user)):
    # TODO: Push to Kafka, store in DB
    return {"status": "ok"}

@router.get("/")
def get_logs(user=Depends(get_current_user)):
    # TODO: Query logs from DB
    return [] 