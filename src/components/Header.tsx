import React, { useContext, useState } from 'react';
import { Plus ,Loader2 } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { AuthContext } from '../contexts/AuthContext';

interface HeaderProps {
  onPostJob: () => void;
  onSignIn: () => void; 
 // userName?: string | null; // acceingting user info
}

const navItems = [
  { label: 'Browse Jobs', path: '/jobs' },
  { label: 'Companies', path: '/companies' },
  { label: 'Resources', path: '/resources' }
];

const Header: React.FC<HeaderProps> = ({ onPostJob, onSignIn }) => {
  const [showLogout, setShowLogout] = useState(false);
  const [loading,setLoading] = useState(false)
  const {user} = useContext(AuthContext);
    const handleLogout = async () => {
      setLoading(true)
    await supabase.auth.signOut();
    window.location.reload(); // or trigger a re-check in App
  };
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-8">
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">FitJobs</h1>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map(({ label, path }) => (
                <Link
                  key={label}
                  to={path}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-xs"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <button 
              onClick={onPostJob}
              className="bg-black dark:bg-white text-white dark:text-black px-3 py-1.5 text-xs font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-3 h-3" />
              <span>Post Job</span>
            </button>

            {user?.name ? (
                <button
                  onClick={handleLogout}
                  className="text-xs text-gray-900 dark:text-white bg-transparent border-none cursor-pointer hover:underline"
                  title="Click to logout"
                >{loading? ( 
                  <Loader2
                  className='animate-spin w-4 h-4'
                  />
                ):(
                    <span>Welcome, {user.name}</span>
                )}
                 
                </button>
              ) : (
                <button 
                  onClick={onSignIn}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-xs"
                >
                  Sign In
                </button>
              )}

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
