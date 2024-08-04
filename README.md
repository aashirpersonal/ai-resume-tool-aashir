# AI-Enhanced Resume Tool

This project is a web-based application designed to help job seekers create, manage, and tailor their resumes using advanced AI technology.

## Project Structure

- `backend/`: Django backend
- `frontend/`: Next.js frontend

## Setup Instructions

### Backend

1. Navigate to the `backend/` directory
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment: `source venv/Scripts/activate` (Windows) or `source venv/bin/activate` (Unix)
4. Install dependencies: `pip install -r requirements.txt`
5. Run migrations: `python manage.py migrate`
6. Start the development server: `python manage.py runserver`

### Frontend

1. Navigate to the `frontend/` directory
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Technologies Used

- Backend: Django, Django REST Framework, Celery, Redis
- Frontend: Next.js, React, Redux Toolkit, React Query, Tailwind CSS
- Database: PostgreSQL
- AI Integration: OpenAI API (GPT-4)