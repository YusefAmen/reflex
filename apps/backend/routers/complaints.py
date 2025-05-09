from fastapi import APIRouter, Depends
from schemas.complaint import ComplaintOut
from utils.auth import get_current_user

router = APIRouter()

@router.get("/", response_model=list[ComplaintOut])
def get_complaints(user=Depends(get_current_user)):
    # TODO: Return grouped complaints
    return [] 