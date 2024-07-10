import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_chat_valid_history():
    with client.websocket_connect("/api/ws/chat") as websocket:
        websocket.send_json({"history": [{"sender": "user", "text": "Hello"}]})
        response = websocket.receive_json()
        assert response == {"message": "This is a static reply from the agent."}


def test_chat_invalid_history():
    with client.websocket_connect("/api/ws/chat") as websocket:
        websocket.send_json({"history": [{"sender": "agent", "text": "Hello"}]})
        response = websocket.receive_json()
        assert response == {"error": "Last message must be from user"}


def test_chat_empty_history():
    with client.websocket_connect("/api/ws/chat") as websocket:
        websocket.send_json({"history": []})
        response = websocket.receive_json()
        assert response == {"error": "Chat history cannot be empty"}


def test_chat_non_alternating_messages():
    with client.websocket_connect("/api/ws/chat") as websocket:
        websocket.send_json(
            {
                "history": [
                    {"sender": "user", "text": "Hello"},
                    {"sender": "user", "text": "Hi again"},
                ]
            }
        )
        response = websocket.receive_json()
        assert response == {"error": "Messages must alternate between user and agent"}
