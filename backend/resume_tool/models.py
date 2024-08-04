# File: backend/resume_tool/models.py

from django.db import models
from django.contrib.auth.models import User

class Resume(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s Resume: {self.title}"

class JobApplication(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    company = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=50)  # You might want to use choices here
    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s Application: {self.company} - {self.position}"

class TailoredResume(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE)
    job_application = models.ForeignKey(JobApplication, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Tailored Resume for {self.job_application}"