import logging
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from pydantic import ValidationError
from app.models import ChatHistory
from app.services import ChatService

router = APIRouter()

logger = logging.getLogger("uvicorn.error")

@router.websocket("/ws/chat")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    logger.info("WebSocket connection accepted")
    try:
        while True:
            try:
                data = await websocket.receive_json()
                logger.info(f"Received data: {data}")
                try:
                    history = ChatHistory(**data)
                except ValidationError as e:
                    error_message = e.errors()[0]["msg"].replace("Value error, ", "")
                    await websocket.send_json({"error": error_message})
                    continue
                agent_reply = ChatService.generate_reply(history)
                await websocket.send_json({"message": agent_reply})
                logger.info(f"Sent reply: {agent_reply}")
            except WebSocketDisconnect:
                logger.info("WebSocket disconnected")
                break
            except Exception as e:
                logger.error(f"Unexpected error: {e}")
                await websocket.send_json({"error": "Unexpected error"})
    except Exception as e:
        logger.error(f"Failed to accept WebSocket connection: {e}")
