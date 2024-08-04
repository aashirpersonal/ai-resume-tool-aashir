// File: frontend/components/ResumeForm.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { createResume, updateResume } from '../lib/api';

interface ResumeFormProps {
  resumeId?: number;
  initialData?: {
    title: string;
    content: string;
  };
  onSubmit: () => void;
}

interface ResumeFormData {
  title: string;
  content: string;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ resumeId, initialData, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ResumeFormData>({
    defaultValues: initialData || { title: '', content: '' }
  });

  const onSubmitForm = async (data: ResumeFormData) => {
    try {
      if (resumeId) {
        await updateResume(resumeId, data);
      } else {
        await createResume(data);
      }
      onSubmit();
    } catch (error) {
      console.error('Error saving resume:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          {...register("title", { required: "Title is required", maxLength: { value: 100, message: "Title must be less than 100 characters" } })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          {...register("content", { required: "Content is required", minLength: { value: 50, message: "Content must be at least 50 characters long" } })}
          rows={10}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>}
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