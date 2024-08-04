# File: backend/resume_tool/views.py

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Resume, JobApplication, TailoredResume
from .serializers import ResumeSerializer, JobApplicationSerializer, TailoredResumeSerializer

class ResumeViewSet(viewsets.ModelViewSet):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

class JobApplicationViewSet(viewsets.ModelViewSet):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

class TailoredResumeViewSet(viewsets.ModelViewSet):
    queryset = TailoredResume.objects.all()
    serializer_class = TailoredResumeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(resume__user=self.request.user)