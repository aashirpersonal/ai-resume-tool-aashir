// File: frontend/components/ResumeForm.tsx

import React, { useState } from 'react';
import { createResume, updateResume } from '../lib/api';

interface ResumeFormProps {
  resumeId?: number;
  initialData?: {
    title: string;
    content: string;
  };
  onSubmit: () => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ resumeId, initialData, onSubmit }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (resumeId) {
        await updateResume(resumeId, { title, content });
      } else {
        await createResume({ title, content });
      }
      onSubmit();
    } catch (error) {
      console.error('Error saving resume:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={10}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {resumeId ? 'Update Resume' : 'Create Resume'}
        </button>
      </div>
    </form>
  );
};

export default ResumeForm;