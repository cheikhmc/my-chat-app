from fastapi import APIRouter, HTTPException
from app.models import ChatHistory

router = APIRouter()

@router.post("/chat", summary="Chat with the bot")
async def chat(history: ChatHistory):
    """
    Endpoint to handle chat interactions with the bot.

    This endpoint accepts a `ChatHistory` object, validates it, and generates 
    a static reply from the bot. The validation checks ensure that there is 
    at least one entry in the chat history and that the last message was 
    sent by the user.

    Args:
        history (ChatHistory): An object representing the chat history, 
        containing a list of messages exchanged between the user and the bot.

    Returns:
        dict: A dictionary containing the bot's reply message.

    Raises:
        HTTPException: If the chat history is invalid (i.e., empty or 
        the last message was not sent by the user), a 400 status code is returned 
        with an appropriate error message.
    """
    # Validate the chat history
    if not history.history or history.history[-1].sender != 'user':
        raise HTTPException(status_code=400, detail="Invalid chat history")

    # Generate agent's reply (static content)
    agent_reply = "This is a static reply from the agent."
    return {"message": agent_reply}
