from pydantic import BaseModel

class ReactionIn(BaseModel):
    projectId: str
    event: str
    threshold: int
    window_minutes: int
    action: str

class ReactionOut(BaseModel):
    status: str 