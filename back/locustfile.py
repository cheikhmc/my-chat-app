from locust import HttpUser, TaskSet, task, between

class UserBehavior(TaskSet):
    
    @task
    def chat(self):
        self.client.post("/api/chat", json={"history": [{"sender": "user", "text": "Hello"}]})

class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(1, 5)
