import React, { useEffect, useState, Suspense, useCallback } from 'react';
import Header from './components/Header';
import SearchFilters from './components/SearchFilters';
import JobGrid from './components/JobGrid';
import { Job } from './types/Job';
import { ThemeProvider } from './contexts/ThemeContext';
import SignInModal from './components/SignInModal';
import DashboardWidget from './components/DashboardWidget';
import { FilterState } from './types/filterState';
import { useJobFilters } from './hooks/useJobFilters';
import { mockJobs } from './data/mockJobs';

import { useLocation, Outlet } from 'react-router-dom';

import { useAuth } from './hooks/useAuth';

const JobDetailModal = React.lazy(() => import('./components/JobDetailModal'));
const PostJobModal = React.lazy(() => import('./components/PostJobModal'));

function App() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const location = useLocation();
  const isHome = location.pathname==='/';
  const {user , setUser} = useAuth();

  const { filters, setFilters, filteredJobs } = useJobFilters(jobs);

  

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, [setFilters]);

  const handlePostJob = useCallback(() => {
    setIsPostModalOpen(true);
  }, []);

  const handleJobClick = useCallback((job: Job) => {
    setSelectedJob(job);
  
  }, []);

  const handleCloseJobDetail = useCallback(() => {
    setSelectedJob(null);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <Header onSignIn={() => setIsSignInOpen(true)} onPostJob={handlePostJob}  />
          <main className="container mx-auto px-6 py-8 max-w-6xl">
            {isHome? (<>
              { user && <DashboardWidget />}       
                <SearchFilters filters={filters} onFilterChange={handleFilterChange} />
                <JobGrid jobs={filteredJobs} onJobClick={handleJobClick} />
                </>) : (<Outlet/>)}


          </main>

        {isPostModalOpen && (
          <Suspense fallback={<div className="text-center text-gray-500 dark:text-gray-300 py-10">Loading Post Job...</div>}>
            <PostJobModal isOpen={isPostModalOpen } onClose={() => setIsPostModalOpen(false)} />
          </Suspense>
        )}

        {selectedJob && (
          <Suspense fallback={<div className="text-center text-gray-500 dark:text-gray-300 py-10">Loading Job Details...</div>}>
            <JobDetailModal job={selectedJob} isOpen={!!selectedJob} onClose={handleCloseJobDetail} />
          </Suspense>
        )}

        <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
      </div>

    </ThemeProvider>
  );
}

export default App;
