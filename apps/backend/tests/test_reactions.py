from fastapi.testclient import TestClient
from main import app
import pytest
from datetime import datetime, timedelta

client = TestClient(app)

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
    response = client.post("/api/reactions/", json=reaction_payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "created"
    assert "id" in data

def test_get_reactions():
    """Test retrieving reactions for a project"""
    project_id = "11111111-1111-1111-1111-111111111111"
    response = client.get(f"/api/reactions/{project_id}")
    assert response.status_code == 200
    reactions = response.json()
    assert isinstance(reactions, list)
    if reactions:
        assert "event" in reactions[0]
        assert "threshold" in reactions[0]
        assert "action" in reactions[0]

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
    create_response = client.post("/api/reactions/", json=reaction_payload)
    reaction_id = create_response.json()["id"]

    # Update the reaction
    update_payload = {
        "threshold": 10,
        "window_minutes": 15
    }
    response = client.patch(f"/api/reactions/{reaction_id}", json=update_payload)
    assert response.status_code == 200
    data = response.json()
    assert data["threshold"] == 10
    assert data["window_minutes"] == 15

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
    create_response = client.post("/api/reactions/", json=reaction_payload)
    reaction_id = create_response.json()["id"]

    # Delete the reaction
    response = client.delete(f"/api/reactions/{reaction_id}")
    assert response.status_code == 200
    assert response.json()["status"] == "deleted"

    # Verify it's gone
    get_response = client.get(f"/api/reactions/{reaction_id}")
    assert get_response.status_code == 404 