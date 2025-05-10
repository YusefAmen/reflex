from pydantic import BaseModel
from typing import Dict, Any, Optional

class LogIn(BaseModel):
    projectId: str
    event: str
    sourceType: str
    timestamp: Optional[str] = None
    metadata: Dict[str, Any]

class LogOut(BaseModel):
    id: str
    project_id: str
    event: str
    source_type: str
    timestamp: str
    metadata: Dict[str, Any]
    created_at: str 