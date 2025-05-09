from pydantic import BaseModel

class LogIn(BaseModel):
    projectId: str
    event: str
    sourceType: str
    timestamp: str
    metadata: dict

class LogOut(BaseModel):
    status: str 