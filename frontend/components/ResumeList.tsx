// File: frontend/components/ResumeList.tsx

import React, { useState, useEffect } from 'react';
import { getResumes, deleteResume } from '../lib/api';

interface Resume {
  id: number;
  title: string;
  created_at: string;
}

const ResumeList: React.FC = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await getResumes();
      setResumes(response.data);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await deleteResume(id);
        setResumes(resumes.filter(resume => resume.id !== id));
      } catch (error) {
        console.error('Error deleting resume:', error);
      }
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Your Resumes</h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {resumes.map((resume) => (
          <li key={resume.id} className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-indigo-600 truncate">{resume.title}</p>
              <div className="ml-2 flex-shrink-0 flex">
                <button
                  onClick={() => handleDelete(resume.id)}
                  className="ml-2 px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full hover:bg-red-200"
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