import React from 'react';
import { Search, MapPin, Briefcase, TrendingUp } from 'lucide-react';
import { FilterState } from '../types/filterState';
import type { LucideIcon } from 'lucide-react';
interface SearchFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}
type BaseFilterConfig = {
  key: keyof FilterState;
  placeholder: string;
  icon: LucideIcon;
};

type TextFilterConfig = BaseFilterConfig & {
  type: 'text';
};

type SelectFilterConfig = BaseFilterConfig & {
  type: 'select';
  options: string[];
};
type FilterConfigItem = TextFilterConfig | SelectFilterConfig;

const filterConfig: FilterConfigItem[] = [
  //add more in the future
  {
    key: 'search',
    type: 'text',
    placeholder: 'Job title or company',
    icon: Search,
  },
  {
    key: 'companyName',
    type: 'text',
    placeholder: 'Company Name',
    icon: Search,
  },
  {
    key: 'location',
    type: 'text',
    placeholder: 'Location',
    icon: MapPin,
  },
  
  {
    key: 'jobType',
    type: 'select',
    placeholder: 'All Job Types',
    icon: Briefcase,
    options: ['Full-time', 'Part-time', 'Contract', 'Freelance'],
  },
  {
    key: 'experience',
    type: 'select',
    placeholder: 'All Experience',
    icon: TrendingUp,
    options: ['Entry-level', 'Mid-level', 'Senior'],
  }
];


const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, onFilterChange }) => {
  const handleInputChange = (field: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {filterConfig.map(({ key, type, placeholder, icon: Icon, options }) => (
          <div key={key} className="relative">
            <Icon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-3 h-3" />
            {type === 'text' ? (
              <input
                type="text"
                placeholder={placeholder}
                value={filters[key]}
                onChange={(e) => handleInputChange(key, e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 transition-colors text-xs"
              />
            ) : (
              <select
                value={filters[key]}
                onChange={(e) => handleInputChange(key, e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 transition-colors text-xs appearance-none cursor-pointer"
              >
                <option value="">{placeholder}</option>
                
                {type === 'select' &&
                    options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}

              </select>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(SearchFilters);

