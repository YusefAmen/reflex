from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_ingest_log():
    response = client.post("/api/logs/", json={
        "projectId": "test",
        "event": "test",
        "sourceType": "chrome",
        "timestamp": "2024-01-01T00:00:00Z",
        "metadata": {}
    })
    assert response.status_code == 200
    assert response.json() == {"status": "ok"} 