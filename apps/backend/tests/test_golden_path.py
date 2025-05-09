from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

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
    resp = client.post("/api/logs/", json=log_payload)
    assert resp.status_code == 200
    assert resp.json()["status"] == "ok"

    # 3. Fetch logs
    resp = client.get("/api/logs/")
    assert resp.status_code == 200
    logs = resp.json()
    assert isinstance(logs, list)
    # If stub returns at least one log, check structure
    if logs:
        assert "event" in logs[0]
        assert "timestamp" in logs[0] 