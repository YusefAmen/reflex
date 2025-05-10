from fastapi import APIRouter, Depends, HTTPException
from schemas.reaction import ReactionIn, ReactionOut, ReactionUpdate
from utils.auth import get_current_user
from typing import List
import uuid
from datetime import datetime

router = APIRouter()

@router.post("/", response_model=ReactionOut)
async def create_reaction(reaction: ReactionIn, user=Depends(get_current_user)):
    """Create a new reaction rule"""
    # TODO: Implement actual database save
    return ReactionOut(
        id=str(uuid.uuid4()),
        project_id=reaction.projectId,
        event=reaction.event,
        threshold=reaction.threshold,
        window_minutes=reaction.window_minutes,
        action=reaction.action,
        action_config=reaction.action_config,
        created_at=datetime.utcnow().isoformat(),
        updated_at=datetime.utcnow().isoformat()
    )

@router.get("/{project_id}", response_model=List[ReactionOut])
async def get_reactions(project_id: str, user=Depends(get_current_user)):
    """Get all reaction rules for a project"""
    # TODO: Implement actual database query
    return []

@router.patch("/{reaction_id}", response_model=ReactionOut)
async def update_reaction(
    reaction_id: str,
    update: ReactionUpdate,
    user=Depends(get_current_user)
):
    """Update an existing reaction rule"""
    # TODO: Implement actual database update
    return ReactionOut(
        id=reaction_id,
        project_id="11111111-1111-1111-1111-111111111111",
        event="error",
        threshold=update.threshold or 5,
        window_minutes=update.window_minutes or 10,
        action=update.action or "email",
        action_config=update.action_config or {"email": "test@example.com"},
        created_at="2024-01-01T00:00:00Z",
        updated_at=datetime.utcnow().isoformat()
    )

@router.delete("/{reaction_id}")
async def delete_reaction(reaction_id: str, user=Depends(get_current_user)):
    """Delete a reaction rule"""
    # TODO: Implement actual database delete
    return {"status": "deleted"} 