# File: backend/resume_tool/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ResumeViewSet, JobApplicationViewSet, TailoredResumeViewSet, UserRegistrationView

router = DefaultRouter()
router.register(r'resumes', ResumeViewSet)
router.register(r'job-applications', JobApplicationViewSet)
router.register(r'tailored-resumes', TailoredResumeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
]