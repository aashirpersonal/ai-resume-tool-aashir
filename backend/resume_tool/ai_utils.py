# File: backend/resume_tool/ai_utils.py

import openai
from django.conf import settings

openai.api_key = settings.OPENAI_API_KEY

def tailor_resume(resume_content, job_description):
    prompt = f"""
    Given the following resume:

    {resume_content}

    And the following job description:

    {job_description}

    Please tailor the resume to better fit the job description. 
    Highlight relevant skills and experiences, and adjust the wording to match keywords from the job description.
    Provide the tailored resume in a clear, professional format.
    """

    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=1000,
        n=1,
        stop=None,
        temperature=0.5,
    )

    return response.choices[0].text.strip()