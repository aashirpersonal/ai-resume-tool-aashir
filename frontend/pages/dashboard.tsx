// File: frontend/pages/dashboard.tsx

import React, { useState } from 'react';
import Layout from '../components/Layout';
import withAuth from '../components/withAuth';
import ResumeList from '../components/ResumeList';
import ResumeForm from '../components/ResumeForm';
import JobApplicationList from '../components/JobApplicationList';
import JobApplicationForm from '../components/JobApplicationForm';
import ResumeTailor from '../components/ResumeTailor';
import Alert from '../components/Alert';

interface Resume {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

interface JobApplication {
  id: number;
  company: string;
  position: string;
  description: string;
  status: string;
  applied_at: string;
}

const DashboardPage: React.FC = () => {
  const [showResumeForm, setShowResumeForm] = useState(false);
  const [editingResume, setEditingResume] = useState<Resume | null>(null);
  const [showJobApplicationForm, setShowJobApplicationForm] = useState(false);
  const [editingJobApplication, setEditingJobApplication] = useState<JobApplication | null>(null);
  const [selectedResumeId, setSelectedResumeId] = useState<number | null>(null);
  const [selectedJobApplicationId, setSelectedJobApplicationId] = useState<number | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);


  const handleResumeEdit = (resume: Resume) => {
    setEditingResume(resume);
    setShowResumeForm(true);
  };

  const handleJobApplicationEdit = (jobApplication: JobApplication) => {
    setEditingJobApplication(jobApplication);
    setShowJobApplicationForm(true);
  };

  const handleResumeFormSubmit = () => {
    setShowResumeForm(false);
    setEditingResume(null);
  };

  const handleJobApplicationFormSubmit = () => {
    setShowJobApplicationForm(false);
    setEditingJobApplication(null);
  };
  const handleTailoredResume = (tailoredResumeId: number) => {
    console.log('Tailored resume created with ID:', tailoredResumeId);
    // Here we should fetch the tailored resume and display it to the user
    // For now, we'll just show a success message
    setGlobalError('Resume successfully tailored! You can now download or view it.');
    setSelectedResumeId(null);
    setSelectedJobApplicationId(null);
  };
  const handleError = (error: string) => {
    setGlobalError(error);
    setTimeout(() => setGlobalError(null), 5000); // Clear error after 5 seconds
  };

  return (
    <Layout title="Dashboard | AI Resume Tool">
      <div className="space-y-6">
        {globalError && <Alert message={globalError} type="success" />}
        
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Tailor Your Resume</h2>
          <p className="mb-4">Select a resume and a job application to tailor your resume automatically.</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-md font-medium text-gray-700 mb-2">Select a Resume</h3>
              <ResumeList 
                onEdit={setEditingResume}
                onSelect={setSelectedResumeId}
                selectedId={selectedResumeId}
              />
            </div>
            <div>
              <h3 className="text-md font-medium text-gray-700 mb-2">Select a Job Application</h3>
              <JobApplicationList 
                onEdit={setEditingJobApplication}
                onSelect={setSelectedJobApplicationId}
                selectedId={selectedJobApplicationId}
              />
            </div>
          </div>
          {selectedResumeId && selectedJobApplicationId && (
            <div className="mt-4">
              <ResumeTailor
                resumeId={selectedResumeId}
                jobApplicationId={selectedJobApplicationId}
                onComplete={handleTailoredResume}
              />
            </div>
          )}
        </div>

        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:flex md:items-center md:justify-between">
            <h2 className="text-lg font-medium text-gray-900">Manage Your Resumes</h2>
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => {
                  setEditingResume(null);
                  setShowResumeForm(!showResumeForm);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {showResumeForm ? 'Cancel' : 'Create New Resume'}
              </button>
            </div>
          </div>
          {showResumeForm && (
            <div className="mt-6">
              <ResumeForm
                resumeId={editingResume?.id}
                initialData={editingResume ? { title: editingResume.title, content: editingResume.content } : undefined}
                onSubmit={() => {
                  setShowResumeForm(false);
                  setEditingResume(null);
                }}
              />
            </div>
          )}
        </div>

        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:flex md:items-center md:justify-between">
            <h2 className="text-lg font-medium text-gray-900">Manage Your Job Applications</h2>
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => {
                  setEditingJobApplication(null);
                  setShowJobApplicationForm(!showJobApplicationForm);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {showJobApplicationForm ? 'Cancel' : 'Create New Job Application'}
              </button>
            </div>
          </div>
          {showJobApplicationForm && (
            <div className="mt-6">
              <JobApplicationForm
                jobApplicationId={editingJobApplication?.id}
                initialData={editingJobApplication}
                onSubmit={() => {
                  setShowJobApplicationForm(false);
                  setEditingJobApplication(null);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(DashboardPage);