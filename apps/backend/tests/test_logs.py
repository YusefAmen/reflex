from fastapi.testclient import TestClient
from main import app
import os

# Set test environment
os.environ["ENV"] = "test"

client = TestClient(app)
headers = {"Authorization": "Bearer test-token"}

def test_ingest_log():
    response = client.post("/api/logs/", json={
        "projectId": "test",
        "event": "test",
        "sourceType": "chrome",
        "timestamp": "2024-01-01T00:00:00Z",
        "metadata": {}
    }, headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert "id" in data
    assert data["project_id"] == "test"
    assert data["event"] == "test"
    assert data["source_type"] == "chrome" 