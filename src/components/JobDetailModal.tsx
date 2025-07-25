import React, {Suspense, useState } from 'react';
import { X, Clock, MapPin, DollarSign, Briefcase, TrendingUp, CheckCircle, Building2 } from 'lucide-react';
import { Job } from '../types/Job';
import { formatDate, getCompanyWebsite, getExperienceBadgeColor, getJobTypeBadgeColor, getSportTagColor } from '../utiils/jobHelpers';
const ApplicationModal = React.lazy(() => import('./ApplicationModal'));


interface JobDetailModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, isOpen, onClose }) => {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  if (!isOpen || !job) return null;
 
  const handleApplyClick = () => {
    setIsApplicationModalOpen(true);
  };

  const handleApplicationModalClose = () => {
    setIsApplicationModalOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center">
                <span className="text-white dark:text-black text-sm font-medium">
                  {job.company.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{job.title}</h2>
                <p className="text-gray-600 dark:text-gray-300">{job.company}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Tags and basic info */}
            <div className="flex flex-wrap gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSportTagColor(job.sportType)}`}>
                {job.sportType}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getJobTypeBadgeColor(job.type)}`}>
                {job.type}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getExperienceBadgeColor(job.experience)}`}>
                {job.experience}
              </span>
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                REMOTE
              </span>
            </div>

            {/* Job details grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Location</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{job.location}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Salary</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{job.salary}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Briefcase className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Job Type</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{job.type}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Experience</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{job.experience}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Building2 className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Website</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{getCompanyWebsite(job.company)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Posted</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{formatDate(job.postedDate)}</p>
                </div>
              </div>
            </div>

            {/* Job description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">About this role</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{job.description}</p>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Requirements</h3>
              <div className="space-y-2">
                {job.requirements.map((req, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply button */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
              <button 
                onClick={handleApplyClick}
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Apply for this position
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <Suspense fallback={<div className="text-center text-gray-500 py-6">Loading Application Form...</div>}>
        <ApplicationModal
          job={job}
          isOpen={isApplicationModalOpen}
          onClose={handleApplicationModalClose}
        />
      </Suspense>
    </>
  );
};

export default JobDetailModal;