// File: frontend/pages/index.tsx

import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

const LandingPage: React.FC = () => {
  return (
    <Layout title="Welcome | AI Resume Tool">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          AI Resume Tool
        </h1>
        <p className="mt-6 max-w-2xl text-xl text-gray-500">
          Create, manage, and tailor your resumes with the power of AI. Find the perfect job with a perfectly tailored resume.
        </p>
        <div className="mt-8 flex space-x-4">
          <Link href="/login" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            Log In
          </Link>
          <Link href="/register" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
            Sign Up
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;