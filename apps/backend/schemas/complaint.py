from pydantic import BaseModel

class ComplaintOut(BaseModel):
    group_id: str
    complaints: list[str]
    count: int 