# File: backend/resume_tool/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ResumeViewSet, JobApplicationViewSet, TailoredResumeViewSet, UserRegistrationView, TailorResumeView, TailoredResumeStatusView

router = DefaultRouter()
router.register(r'resumes', ResumeViewSet)
router.register(r'job-applications', JobApplicationViewSet)
router.register(r'tailored-resumes', TailoredResumeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('tailor-resume/', TailorResumeView.as_view(), name='tailor-resume'),
    path('tailor-resume-status/<str:task_id>/', TailoredResumeStatusView.as_view(), name='tailor-resume-status'),
]