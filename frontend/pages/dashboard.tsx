// File: frontend/pages/dashboard.tsx

import React, { useState } from 'react';
import Layout from '../components/Layout';
import withAuth from '../components/withAuth';
import ResumeList from '../components/ResumeList';
import ResumeForm from '../components/ResumeForm';

interface Resume {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

const DashboardPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingResume, setEditingResume] = useState<Resume | null>(null);

  const handleEdit = (resume: Resume) => {
    setEditingResume(resume);
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingResume(null);
  };

  return (
    <Layout title="Dashboard | AI Resume Tool">
      <div className="space-y-6">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:flex md:items-center md:justify-between">
            <h2 className="text-lg font-medium text-gray-900">Your Resumes</h2>
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => {
                  setEditingResume(null);
                  setShowForm(!showForm);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {showForm ? 'Cancel' : 'Create New Resume'}
              </button>
            </div>
          </div>
          {showForm && (
            <div className="mt-6">
              <ResumeForm
                resumeId={editingResume?.id}
                initialData={editingResume ? { title: editingResume.title, content: editingResume.content } : undefined}
                onSubmit={handleFormSubmit}
              />
            </div>
          )}
        </div>
        <ResumeList onEdit={handleEdit} />
      </div>
    </Layout>
  );
};

export default withAuth(DashboardPage);