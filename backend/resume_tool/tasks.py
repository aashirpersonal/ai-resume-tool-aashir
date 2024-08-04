# File: backend/resume_tool/tasks.py

from celery import shared_task
from .ai_utils import tailor_resume
from .models import Resume, JobApplication, TailoredResume

@shared_task
def tailor_resume_task(resume_id, job_application_id):
    resume = Resume.objects.get(id=resume_id)
    job_application = JobApplication.objects.get(id=job_application_id)

    tailored_content = tailor_resume(resume.content, job_application.description)

    tailored_resume = TailoredResume.objects.create(
        resume=resume,
        job_application=job_application,
        content=tailored_content
    )

    return tailored_resume.id