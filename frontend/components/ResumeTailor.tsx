// File: frontend/components/ResumeTailor.tsx

import React, { useState, useEffect } from 'react';
import { tailorResume, checkTailoringStatus } from '../lib/api';

interface ResumeTailorProps {
  resumeId: number;
  jobApplicationId: number;
  onComplete: (tailoredResumeId: number) => void;
}

const ResumeTailor: React.FC<ResumeTailorProps> = ({ resumeId, jobApplicationId, onComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [taskId, setTaskId] = useState<string | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const checkStatus = async () => {
      if (taskId) {
        try {
          const response = await checkTailoringStatus(taskId);
          if (response.data.state === 'SUCCESS') {
            clearInterval(intervalId);
            setIsLoading(false);
            onComplete(response.data.result);
          } else if (response.data.state === 'FAILURE') {
            clearInterval(intervalId);
            setIsLoading(false);
            setError('Failed to tailor resume. Please try again.');
          }
        } catch (error) {
          console.error('Error checking tailoring status:', error);
          clearInterval(intervalId);
          setIsLoading(false);
          setError('An error occurred while checking the tailoring status.');
        }
      }
    };

    if (isLoading && taskId) {
      intervalId = setInterval(checkStatus, 2000); // Check every 2 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isLoading, taskId, onComplete]);

  const handleTailor = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await tailorResume(resumeId, jobApplicationId);
      setTaskId(response.data.task_id);
    } catch (error) {
      console.error('Error tailoring resume:', error);
      setIsLoading(false);
      setError('An error occurred while tailoring the resume.');
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleTailor}
        disabled={isLoading}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isLoading ? 'Tailoring...' : 'Tailor Resume'}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default ResumeTailor;