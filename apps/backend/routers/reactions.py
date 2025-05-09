from fastapi import APIRouter, Depends
from schemas.reaction import ReactionIn, ReactionOut
from utils.auth import get_current_user

router = APIRouter()

@router.post("/", response_model=ReactionOut)
def create_reaction(reaction: ReactionIn, user=Depends(get_current_user)):
    # TODO: Save reaction rule
    return {"status": "created"}

@router.get("/")
def list_reactions(user=Depends(get_current_user)):
    # TODO: List all reaction rules for a project
    return [] 