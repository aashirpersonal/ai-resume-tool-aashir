// File: frontend/components/ResumeList.tsx

import React, { useState, useEffect } from 'react';
import { getResumes, deleteResume } from '../lib/api';
import Alert from './Alert';
import LoadingSpinner from './LoadingSpinner';

interface Resume {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

interface ResumeListProps {
  onEdit: (resume: Resume) => void;
  onSelect: (resumeId: number) => void;
  selectedId: number | null;
}

const ResumeList: React.FC<ResumeListProps> = ({ onEdit, onSelect, selectedId }) => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const response = await getResumes();
      setResumes(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching resumes:', error);
      setError('Failed to fetch resumes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await deleteResume(id);
        setResumes(resumes.filter(resume => resume.id !== id));
      } catch (error) {
        console.error('Error deleting resume:', error);
        setError('Failed to delete resume. Please try again later.');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Your Resumes</h3>
      </div>
      {error && <Alert message={error} type="error" />}
      <ul className="divide-y divide-gray-200">
        {resumes.map((resume) => (
          <li key={resume.id} className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-indigo-600 truncate">{resume.title}</p>
              <div className="ml-2 flex-shrink-0 flex">
                <button
                  onClick={() => onSelect(resume.id)}
                  className={`mr-2 px-2 py-1 text-xs font-medium rounded-full ${
                    selectedId === resume.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200'
                  }`}
                >
                  {selectedId === resume.id ? 'Selected' : 'Select'}
                </button>
                <button
                  onClick={() => onEdit(resume)}
                  className="mr-2 px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(resume.id)}
                  className="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500">Created: {new Date(resume.created_at).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResumeList;