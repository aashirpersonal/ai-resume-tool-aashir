# File: backend/resume_tool/admin.py

from django.contrib import admin
from .models import Resume, JobApplication, TailoredResume

@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'created_at', 'updated_at')
    search_fields = ('user__username', 'title', 'content')

@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ('user', 'company', 'position', 'status', 'applied_at')
    search_fields = ('user__username', 'company', 'position', 'description')

@admin.register(TailoredResume)
class TailoredResumeAdmin(admin.ModelAdmin):
    list_display = ('resume', 'job_application', 'created_at')
    search_fields = ('resume__title', 'job_application__company', 'job_application__position')