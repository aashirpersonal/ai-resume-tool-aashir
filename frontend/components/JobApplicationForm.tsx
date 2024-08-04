// File: frontend/components/JobApplicationForm.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { createJobApplication, updateJobApplication } from '../lib/api';

interface JobApplicationFormProps {
  jobApplicationId?: number;
  initialData?: {
    company: string;
    position: string;
    description: string;
    status: string;
  };
  onSubmit: () => void;
}

interface JobApplicationFormData {
  company: string;
  position: string;
  description: string;
  status: string;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ jobApplicationId, initialData, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<JobApplicationFormData>({
    defaultValues: initialData || { company: '', position: '', description: '', status: 'Applied' }
  });

  const onSubmitForm = async (data: JobApplicationFormData) => {
    try {
      if (jobApplicationId) {
        await updateJobApplication(jobApplicationId, data);
      } else {
        await createJobApplication(data);
      }
      onSubmit();
    } catch (error) {
      console.error('Error saving job application:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
          Company
        </label>
        <input
          type="text"
          id="company"
          {...register("company", { required: "Company name is required", maxLength: { value: 100, message: "Company name must be less than 100 characters" } })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>}
      </div>
      <div>
        <label htmlFor="position" className="block text-sm font-medium text-gray-700">
          Position
        </label>
        <input
          type="text"
          id="position"
          {...register("position", { required: "Position is required", maxLength: { value: 100, message: "Position must be less than 100 characters" } })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>}
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          {...register("description", { required: "Description is required" })}
          rows={4}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          {...register("status", { required: "Status is required" })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>}
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {jobApplicationId ? 'Update Job Application' : 'Create Job Application'}
        </button>
      </div>
    </form>
  );
};

export default JobApplicationForm;