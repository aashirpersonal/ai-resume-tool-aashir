# File: backend/resume_tool/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Resume, JobApplication, TailoredResume

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class ResumeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Resume
        fields = ['id', 'user', 'title', 'content', 'created_at', 'updated_at']

class JobApplicationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = JobApplication
        fields = ['id', 'user', 'company', 'position', 'description', 'status', 'applied_at']

class TailoredResumeSerializer(serializers.ModelSerializer):
    resume = ResumeSerializer(read_only=True)
    job_application = JobApplicationSerializer(read_only=True)

    class Meta:
        model = TailoredResume
        fields = ['id', 'resume', 'job_application', 'content', 'created_at']