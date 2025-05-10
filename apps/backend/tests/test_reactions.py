from fastapi.testclient import TestClient
from main import app
import os

# Set test environment
os.environ["ENV"] = "test"

client = TestClient(app)
headers = {"Authorization": "Bearer test-token"}

def test_create_reaction():
    """Test creating a new reaction"""
    reaction_payload = {
        "projectId": "11111111-1111-1111-1111-111111111111",
        "event": "error",
        "threshold": 5,
        "window_minutes": 10,
        "action": "email",
        "action_config": {
            "email": "test@example.com"
        }
    }
    response = client.post("/api/reactions/", json=reaction_payload, headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert "id" in data
    assert data["project_id"] == reaction_payload["projectId"]
    assert data["event"] == reaction_payload["event"]
    assert data["threshold"] == reaction_payload["threshold"]
    assert data["window_minutes"] == reaction_payload["window_minutes"]
    assert data["action"] == reaction_payload["action"]
    assert data["action_config"] == reaction_payload["action_config"]

def test_get_reactions():
    """Test retrieving reactions for a project"""
    project_id = "11111111-1111-1111-1111-111111111111"
    response = client.get(f"/api/reactions/{project_id}", headers=headers)
    assert response.status_code == 200
    reactions = response.json()
    assert isinstance(reactions, list)

def test_update_reaction():
    """Test updating an existing reaction"""
    # First create a reaction
    reaction_payload = {
        "projectId": "11111111-1111-1111-1111-111111111111",
        "event": "error",
        "threshold": 5,
        "window_minutes": 10,
        "action": "email",
        "action_config": {
            "email": "test@example.com"
        }
    }
    create_response = client.post("/api/reactions/", json=reaction_payload, headers=headers)
    reaction_id = create_response.json()["id"]

    # Update the reaction
    update_payload = {
        "threshold": 10,
        "window_minutes": 20
    }
    response = client.patch(f"/api/reactions/{reaction_id}", json=update_payload, headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["threshold"] == update_payload["threshold"]
    assert data["window_minutes"] == update_payload["window_minutes"]

def test_delete_reaction():
    """Test deleting a reaction"""
    # First create a reaction
    reaction_payload = {
        "projectId": "11111111-1111-1111-1111-111111111111",
        "event": "error",
        "threshold": 5,
        "window_minutes": 10,
        "action": "email",
        "action_config": {
            "email": "test@example.com"
        }
    }
    create_response = client.post("/api/reactions/", json=reaction_payload, headers=headers)
    reaction_id = create_response.json()["id"]

    # Delete the reaction
    response = client.delete(f"/api/reactions/{reaction_id}", headers=headers)
    assert response.status_code == 200
    assert response.json() == {"status": "deleted"} 