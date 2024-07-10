from pydantic import BaseModel, field_validator
from typing import List
from enum import Enum


class Sender(str, Enum):
    user = "user"
    agent = "agent"


class Message(BaseModel):
    sender: Sender
    text: str


class ChatHistory(BaseModel):
    history: List[Message]

    @field_validator("history")
    def check_alternate_messages(cls, v):
        if not v:
            raise ValueError("Chat history cannot be empty")
        for i in range(1, len(v)):
            if v[i].sender == v[i - 1].sender:
                raise ValueError("Messages must alternate between user and agent")
        if v[-1].sender != "user":
            raise ValueError("Last message must be from user")
        return v
