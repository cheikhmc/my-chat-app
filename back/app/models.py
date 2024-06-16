from pydantic import BaseModel
from typing import List

class Message(BaseModel):
    sender: str
    text: str

class ChatHistory(BaseModel):
    history: List[Message]
