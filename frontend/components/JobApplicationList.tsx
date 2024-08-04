// File: frontend/components/JobApplicationList.tsx

import React, { useState, useEffect } from 'react';
import { getJobApplications, deleteJobApplication } from '../lib/api';
import Alert from './Alert';
import LoadingSpinner from './LoadingSpinner';

interface JobApplication {
  id: number;
  company: string;
  position: string;
  status: string;
  applied_at: string;
}

interface JobApplicationListProps {
  onEdit: (jobApplication: JobApplication) => void;
  onSelect: (jobApplicationId: number) => void;
  selectedId: number | null;
}

const JobApplicationList: React.FC<JobApplicationListProps> = ({ onEdit, onSelect, selectedId }) => {
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJobApplications();
  }, []);

  const fetchJobApplications = async () => {
    try {
      setLoading(true);
      const response = await getJobApplications();
      setJobApplications(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching job applications:', error);
      setError('Failed to fetch job applications. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      try {
        await deleteJobApplication(id);
        setJobApplications(jobApplications.filter(app => app.id !== id));
      } catch (error) {
        console.error('Error deleting job application:', error);
        setError('Failed to delete job application. Please try again later.');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Your Job Applications</h3>
      </div>
      {error && <Alert message={error} type="error" />}
      <ul className="divide-y divide-gray-200">
        {jobApplications.map((app) => (
          <li key={app.id} className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-600 truncate">{app.company}</p>
                <p className="text-sm text-gray-500">{app.position}</p>
              </div>
              <div className="ml-2 flex-shrink-0 flex">
                <button
                  onClick={() => onSelect(app.id)}
                  className={`mr-2 px-2 py-1 text-xs font-medium rounded-full ${
                    selectedId === app.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200'
                  }`}
                >
                  {selectedId === app.id ? 'Selected' : 'Select'}
                </button>
                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {app.status}
                </p>
                <button
                  onClick={() => onEdit(app)}
                  className="ml-2 px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(app.id)}
                  className="ml-2 px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500">Applied: {new Date(app.applied_at).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobApplicationList;