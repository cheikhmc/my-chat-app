from fastapi import APIRouter, HTTPException
from app.models import ChatHistory

router = APIRouter()

@router.post("/chat", summary="Chat with the bot")
async def chat(history: ChatHistory):
    # Validate the chat history
    if not history.history or history.history[-1].sender != 'user':
        raise HTTPException(status_code=400, detail="Invalid chat history")

    # Generate agent's reply (static content)
    agent_reply = "This is a static reply from the agent."
    return {"message": agent_reply}
