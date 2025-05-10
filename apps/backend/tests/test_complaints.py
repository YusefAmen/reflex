from fastapi.testclient import TestClient
from main import app
import pytest
from datetime import datetime, timedelta
import os

# Set test environment
os.environ["ENV"] = "test"

client = TestClient(app)
headers = {"Authorization": "Bearer test-token"}

def test_get_complaints():
    """Test retrieving complaints for a project"""
    project_id = "11111111-1111-1111-1111-111111111111"
    response = client.get(f"/api/complaints/{project_id}", headers=headers)
    assert response.status_code == 200
    complaints = response.json()
    assert isinstance(complaints, list)
    if complaints:
        assert "id" in complaints[0]
        assert "event" in complaints[0]
        assert "timestamp" in complaints[0]
        assert "status" in complaints[0]

def test_get_complaint_details():
    """Test retrieving details of a specific complaint"""
    # First create a complaint (this would normally happen via reaction trigger)
    complaint_id = "22222222-2222-2222-2222-222222222222"
    response = client.get(f"/api/complaints/{complaint_id}", headers=headers)
    assert response.status_code == 200
    complaint = response.json()
    assert "id" in complaint
    assert "event" in complaint
    assert "timestamp" in complaint
    assert "status" in complaint
    assert "metadata" in complaint

def test_update_complaint_status():
    """Test updating the status of a complaint"""
    complaint_id = "22222222-2222-2222-2222-222222222222"
    update_payload = {
        "status": "resolved",
        "resolution_notes": "Fixed the issue"
    }
    response = client.patch(f"/api/complaints/{complaint_id}", json=update_payload, headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "resolved"
    assert data["resolution_notes"] == "Fixed the issue"

def test_get_complaints_with_filters():
    """Test retrieving complaints with various filters"""
    project_id = "11111111-1111-1111-1111-111111111111"
    
    # Test status filter
    response = client.get(f"/api/complaints/{project_id}?status=active", headers=headers)
    assert response.status_code == 200
    complaints = response.json()
    assert isinstance(complaints, list)
    if complaints:
        assert all(c["status"] == "active" for c in complaints)

    # Test date range filter
    start_date = (datetime.now() - timedelta(days=7)).isoformat()
    end_date = datetime.now().isoformat()
    response = client.get(
        f"/api/complaints/{project_id}?start_date={start_date}&end_date={end_date}",
        headers=headers
    )
    assert response.status_code == 200
    complaints = response.json()
    assert isinstance(complaints, list)
    if complaints:
        for complaint in complaints:
            complaint_date = datetime.fromisoformat(complaint["timestamp"])
            assert start_date <= complaint["timestamp"] <= end_date 