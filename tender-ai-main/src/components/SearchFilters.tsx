import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline';

export interface FilterState {
  keyword: string;
  organization: string;
  category: string;
  location: string;
  minValue: string;
  maxValue: string;
  deadline: string;
}

interface SearchFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onSearch: () => void;
  isLoading?: boolean;
}

const SearchFilters = ({ filters, onFiltersChange, onSearch, isLoading = false }: SearchFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = (key: keyof FilterState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      keyword: '',
      organization: '',
      category: '',
      location: '',
      minValue: '',
      maxValue: '',
      deadline: '',
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  const categories = [
    'Construction', 'IT Services', 'Consulting', 'Healthcare', 'Education',
    'Transportation', 'Energy', 'Defense', 'Environmental', 'Research'
  ];

  const organizations = [
    'Federal Government', 'State Government', 'Local Government', 'Private Sector',
    'Non-Profit', 'International', 'Educational Institution'
  ];

  return (
    <motion.div 
      className="glass rounded-xl border border-glass-border p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
        <div className="flex-1">
          <Input
            placeholder="Search tenders by keywords..."
            value={filters.keyword}
            onChange={(e) => updateFilter('keyword', e.target.value)}
            className="h-10 sm:h-12 bg-background/50 border-glass-border text-sm sm:text-base"
            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
          />
        </div>
        <div className="flex gap-2 sm:gap-3">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 sm:px-4 text-xs sm:text-sm h-10 sm:h-12"
          >
            <AdjustmentsHorizontalIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Filters</span>
            <span className="sm:hidden">Filter</span>
          </Button>
          <Button
            variant="hero"
            onClick={onSearch}
            disabled={isLoading}
            className="px-4 sm:px-8 text-xs sm:text-sm h-10 sm:h-12"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-glass-border pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Organization Type</label>
                  <Select value={filters.organization} onValueChange={(value) => updateFilter('organization', value)}>
                    <SelectTrigger className="bg-background/50 border-glass-border h-9 sm:h-10 text-xs sm:text-sm">
                      <SelectValue placeholder="Select organization" />
                    </SelectTrigger>
                    <SelectContent>
                      {organizations.map(org => (
                        <SelectItem key={org} value={org} className="text-xs sm:text-sm">{org}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Category</label>
                  <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
                    <SelectTrigger className="bg-background/50 border-glass-border h-9 sm:h-10 text-xs sm:text-sm">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat} className="text-xs sm:text-sm">{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Location</label>
                  <Input
                    placeholder="Enter location"
                    value={filters.location}
                    onChange={(e) => updateFilter('location', e.target.value)}
                    className="bg-background/50 border-glass-border h-9 sm:h-10 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Min Value ($)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={filters.minValue}
                    onChange={(e) => updateFilter('minValue', e.target.value)}
                    className="bg-background/50 border-glass-border h-9 sm:h-10 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Max Value ($)</label>
                  <Input
                    type="number"
                    placeholder="1000000"
                    value={filters.maxValue}
                    onChange={(e) => updateFilter('maxValue', e.target.value)}
                    className="bg-background/50 border-glass-border h-9 sm:h-10 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Deadline Before</label>
                  <Input
                    type="date"
                    value={filters.deadline}
                    onChange={(e) => updateFilter('deadline', e.target.value)}
                    className="bg-background/50 border-glass-border h-9 sm:h-10 text-xs sm:text-sm"
                  />
                </div>
              </div>

              {hasActiveFilters && (
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-destructive hover:text-destructive text-xs sm:text-sm"
                  >
                    <XMarkIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchFilters;