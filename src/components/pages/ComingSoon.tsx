import React from 'react';
import { Link } from 'react-router-dom';

const ComingSoon: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Coming Soon</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        This page is under construction. Please check back later!
      </p>
      <Link
        to="/"
        className="text-sm text-white bg-black dark:bg-white dark:text-black px-4 py-2 rounded hover:opacity-80 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ComingSoon;
