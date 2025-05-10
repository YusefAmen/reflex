from pydantic import BaseModel
from typing import Dict, Any, Optional

class ComplaintUpdate(BaseModel):
    status: str
    resolution_notes: Optional[str] = None

class ComplaintOut(BaseModel):
    id: str
    project_id: str
    event: str
    timestamp: str
    status: str
    metadata: Dict[str, Any]
    created_at: str
    updated_at: str
    resolution_notes: Optional[str] = None 