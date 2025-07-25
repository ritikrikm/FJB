import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const DashboardWidget: React.FC = () => {
  const [userInfo, setUserInfo] = useState<{ email: string; id: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserInfo({ email: user.email!, id: user.id });
      }
    };

    fetchUser();
  }, []);

  if (!userInfo) return null;

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-md mb-6">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Welcome back!</h2>
      <p className="text-xs text-gray-600 dark:text-gray-400">Email: {userInfo.email}</p>
      <p className="text-xs text-gray-600 dark:text-gray-400">UID: {userInfo.id}</p>
    </div>
  );
};

export default DashboardWidget;
