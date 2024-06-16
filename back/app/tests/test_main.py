from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_chat_valid_history():
    response = client.post("/api/chat", json={"history": [{"sender": "user", "text": "Hello"}]})
    assert response.status_code == 200
    assert response.json() == {"message": "This is a static reply from the agent."}

def test_chat_invalid_history():
    response = client.post("/api/chat", json={"history": [{"sender": "agent", "text": "Hello"}]})
    assert response.status_code == 400
    assert response.json() == {"detail": "Invalid chat history"}

def test_chat_empty_history():
    response = client.post("/api/chat", json={"history": []})
    assert response.status_code == 400
    assert response.json() == {"detail": "Invalid chat history"}
