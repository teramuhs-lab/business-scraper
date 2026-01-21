'use client';

import { useState } from 'react';
import { SearchFormData } from '@/types';

interface SearchFormProps {
  onSearch: (data: SearchFormData) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [location, setLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxResults, setMaxResults] = useState(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim() || !searchQuery.trim()) return;

    onSearch({
      location: location.trim(),
      search_query: searchQuery.trim(),
      max_number_of_results: maxResults,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 space-y-6">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., San Francisco, CA"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="searchQuery" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Business Type
          </label>
          <input
            type="text"
            id="searchQuery"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="e.g., coffee shops, restaurants, gyms"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="maxResults" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Max Results: {maxResults}
          </label>
          <input
            type="range"
            id="maxResults"
            min="1"
            max="50"
            value={maxResults}
            onChange={(e) => setMaxResults(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
            disabled={isLoading}
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>1</span>
            <span>50</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !location.trim() || !searchQuery.trim()}
          className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Searching...
            </>
          ) : (
            <>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search Businesses
            </>
          )}
        </button>
      </div>
    </form>
  );
}
