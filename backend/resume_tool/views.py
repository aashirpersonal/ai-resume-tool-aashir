# File: backend/resume_tool/views.py

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Resume, JobApplication, TailoredResume
from .serializers import ResumeSerializer, JobApplicationSerializer, TailoredResumeSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .serializers import UserSerializer
from .ai_utils import tailor_resume

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
    
class UserRegistrationView(APIView):
    permission_classes = []  # Allow any user to register

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.create_user(
                username=serializer.validated_data['username'],
                email=serializer.validated_data['email'],
                password=request.data['password']  # Note: password is not in the serializer for security
            )
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class TailorResumeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        resume_id = request.data.get('resume_id')
        job_application_id = request.data.get('job_application_id')

        try:
            resume = Resume.objects.get(id=resume_id, user=request.user)
            job_application = JobApplication.objects.get(id=job_application_id, user=request.user)
        except (Resume.DoesNotExist, JobApplication.DoesNotExist):
            return Response({'error': 'Invalid resume or job application'}, status=status.HTTP_400_BAD_REQUEST)

        tailored_content = tailor_resume(resume.content, job_application.description)

        tailored_resume = TailoredResume.objects.create(
            resume=resume,
            job_application=job_application,
            content=tailored_content
        )

        serializer = TailoredResumeSerializer(tailored_resume)
        return Response(serializer.data, status=status.HTTP_201_CREATED)