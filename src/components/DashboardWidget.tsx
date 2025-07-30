import React from 'react';
import { useAuth } from '../hooks/useAuth';



const DashboardWidget: React.FC = () => {

  const {user} = useAuth();

  if (!user) return null;

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-md mb-6">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Welcome back!</h2>
      <p className="text-xs text-gray-600 dark:text-gray-400">Email: {user.email}</p>
      <p className="text-xs text-gray-600 dark:text-gray-400">UID: {user.id}</p>
    </div>
  );
};

export default DashboardWidget;
