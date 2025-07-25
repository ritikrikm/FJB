import { useState, useEffect } from 'react';
import { Job } from '../types/Job';
import { FilterState } from '../types/filterState';
import { filterJobs } from '../utiils/jobFilters';

// reusable hook to debounce
function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export function useJobFilters(initialJobs: Job[]) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    location: '',
    jobType: '',
    experience: ''
  });

  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  //  Debouncing
  const debouncedFilters = useDebouncedValue(filters, 300);//also holding the live values in filters

  //two jobs
  useEffect(() => {
    const filtered = filterJobs(initialJobs, debouncedFilters);
    setFilteredJobs(filtered);
  }, [initialJobs, debouncedFilters]);

  //giving back to compo
  return {
    filters,
    setFilters,
    filteredJobs
  };
}
