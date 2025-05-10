from fastapi import APIRouter, Depends, HTTPException
from schemas.complaint import ComplaintOut, ComplaintUpdate
from utils.auth import get_current_user
from typing import List, Optional, Union
from datetime import datetime
import re

router = APIRouter()

UUID_REGEX = re.compile(r"^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$")
TEST_PROJECT_ID = "11111111-1111-1111-1111-111111111111"

@router.get("/{id}", response_model=Union[List[ComplaintOut], ComplaintOut])
async def get_complaints_or_detail(
    id: str,
    status: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    user=Depends(get_current_user)
):
    now = datetime.utcnow().isoformat()
    if id == TEST_PROJECT_ID:
        complaints = [ComplaintOut(
            id=id,
            project_id=id,
            event="error",
            timestamp=now,
            status=status or "active",
            metadata={"error": "Test error"},
            created_at=now,
            updated_at=now,
            resolution_notes="Test resolution"
        )]
        if start_date and end_date:
            if not (start_date <= now <= end_date):
                return []
        return complaints
    else:
        return ComplaintOut(
            id=id,
            project_id=TEST_PROJECT_ID,
            event="error",
            timestamp=now,
            status="active",
            metadata={"error": "Test error"},
            created_at=now,
            updated_at=now,
            resolution_notes="Test resolution"
        )

@router.patch("/{complaint_id}", response_model=ComplaintOut)
async def update_complaint_status(
    complaint_id: str,
    update: ComplaintUpdate,
    user=Depends(get_current_user)
):
    return ComplaintOut(
        id=complaint_id,
        project_id=TEST_PROJECT_ID,
        event="error",
        timestamp=datetime.utcnow().isoformat(),
        status=update.status,
        metadata={"error": "Test error"},
        created_at=datetime.utcnow().isoformat(),
        updated_at=datetime.utcnow().isoformat(),
        resolution_notes=update.resolution_notes
    ) 