// File: frontend/pages/dashboard.tsx

import React, { useState } from 'react';
import Layout from '../components/Layout';
import withAuth from '../components/withAuth';
import ResumeList from '../components/ResumeList';
import ResumeForm from '../components/ResumeForm';
import JobApplicationList from '../components/JobApplicationList';
import JobApplicationForm from '../components/JobApplicationForm';
import ResumeTailor from '../components/ResumeTailor';

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
    // Here you can handle the newly created tailored resume,
    // for example, by fetching it and displaying it to the user
    console.log('Tailored resume created with ID:', tailoredResumeId);
    // Reset selection
    setSelectedResumeId(null);
    setSelectedJobApplicationId(null);
  };

  return (
    <Layout title="Dashboard | AI Resume Tool">
      <div className="space-y-6">
        {/* Resumes section */}
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:flex md:items-center md:justify-between">
            <h2 className="text-lg font-medium text-gray-900">Your Resumes</h2>
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
                onSubmit={handleResumeFormSubmit}
              />
            </div>
          )}
        </div>
        <ResumeList 
          onEdit={handleResumeEdit} 
          onSelect={(resumeId) => setSelectedResumeId(resumeId)}
          selectedId={selectedResumeId}
        />

        {/* Job Applications section */}
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:flex md:items-center md:justify-between">
            <h2 className="text-lg font-medium text-gray-900">Your Job Applications</h2>
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
                onSubmit={handleJobApplicationFormSubmit}
              />
            </div>
          )}
        </div>
        <JobApplicationList 
          onEdit={handleJobApplicationEdit}
          onSelect={(jobApplicationId) => setSelectedJobApplicationId(jobApplicationId)}
          selectedId={selectedJobApplicationId}
        />

        {/* Resume Tailoring section */}
        {selectedResumeId && selectedJobApplicationId && (
          <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Tailor Resume</h2>
            <ResumeTailor
              resumeId={selectedResumeId}
              jobApplicationId={selectedJobApplicationId}
              onComplete={handleTailoredResume}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default withAuth(DashboardPage);