
import { FilterState } from "../types/filterState";
import { Job } from "../types/Job";

export function filterJobs(jobs: Job[], filters: FilterState): Job[] {
    return jobs.filter(job => {
      const matchesSearch =
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase());
  
      const matchesLocation =
        filters.location === '' || job.location.toLowerCase().includes(filters.location.toLowerCase());
  
      const matchesJobType =
        filters.jobType === '' || job.type === filters.jobType;
  
      const matchesExperience =
        filters.experience === '' || job.experience === filters.experience;
      const companyName = !filters.companyName ||job.company.toLowerCase().includes(filters.companyName.toLowerCase());
      return matchesSearch && matchesLocation && matchesJobType && matchesExperience && companyName;
    });
  }