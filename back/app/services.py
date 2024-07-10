from app.models import ChatHistory


class ChatService:
    @staticmethod
    def generate_reply(history: ChatHistory) -> str:
        """
        Generate a static reply from the agent.

        Args:
            history (ChatHistory): An object representing the chat history.

        Returns:
            str: A static reply from the agent.
        """
        return "This is a static reply from the agent."
