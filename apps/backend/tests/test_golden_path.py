from fastapi.testclient import TestClient
from main import app
import os

# Set test environment
os.environ["ENV"] = "test"

client = TestClient(app)
headers = {"Authorization": "Bearer test-token"}

def test_golden_path():
    # 1. Create a project (stubbed, so just simulate)
    # (Assume POST /api/projects exists in real impl; here, just use logs)

    # 2. Ingest a log
    log_payload = {
        "projectId": "11111111-1111-1111-1111-111111111111",
        "event": "test_event",
        "sourceType": "chrome",
        "timestamp": "2024-01-01T00:00:00Z",
        "metadata": {"foo": "bar"}
    }
    resp = client.post("/api/logs/", json=log_payload, headers=headers)
    assert resp.status_code == 200
    log_data = resp.json()
    assert "id" in log_data
    assert log_data["project_id"] == log_payload["projectId"]
    assert log_data["event"] == log_payload["event"]

    # 3. Create a reaction
    reaction_payload = {
        "projectId": "11111111-1111-1111-1111-111111111111",
        "event": "test_event",
        "threshold": 1,
        "window_minutes": 5,
        "action": "email",
        "action_config": {
            "email": "test@example.com"
        }
    }
    resp = client.post("/api/reactions/", json=reaction_payload, headers=headers)
    assert resp.status_code == 200
    reaction_data = resp.json()
    assert "id" in reaction_data
    assert reaction_data["project_id"] == reaction_payload["projectId"]
    assert reaction_data["event"] == reaction_payload["event"]

    # 4. Check for complaints (should be created by reaction trigger)
    resp = client.get(f"/api/complaints/{log_payload['projectId']}", headers=headers)
    assert resp.status_code == 200
    complaints = resp.json()
    assert isinstance(complaints, list)

    # 5. Fetch logs
    resp = client.get("/api/logs/", headers=headers)
    assert resp.status_code == 200
    logs = resp.json()
    assert isinstance(logs, list)
    # If stub returns at least one log, check structure
    if logs:
        assert "event" in logs[0]
        assert "timestamp" in logs[0] 