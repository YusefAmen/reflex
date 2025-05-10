from pydantic import BaseModel
from typing import Dict, Any

class ReactionIn(BaseModel):
    projectId: str
    event: str
    threshold: int
    window_minutes: int
    action: str
    action_config: Dict[str, Any]

class ReactionUpdate(BaseModel):
    threshold: int | None = None
    window_minutes: int | None = None
    action: str | None = None
    action_config: Dict[str, Any] | None = None

class ReactionOut(BaseModel):
    id: str
    project_id: str
    event: str
    threshold: int
    window_minutes: int
    action: str
    action_config: Dict[str, Any]
    created_at: str
    updated_at: str 