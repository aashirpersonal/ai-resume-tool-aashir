// File: frontend/components/Alert.tsx

import React from 'react';

interface AlertProps {
  message: string;
  type: 'error' | 'success' | 'info';
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  const baseClasses = "p-4 mb-4 rounded-md";
  const typeClasses = {
    error: "bg-red-100 text-red-700",
    success: "bg-green-100 text-green-700",
    info: "bg-blue-100 text-blue-700"
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`} role="alert">
      {message}
    </div>
  );
};

export default Alert;