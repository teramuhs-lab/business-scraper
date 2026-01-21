'use client';

import { Business } from '@/types';
import BusinessCard from './BusinessCard';

interface ResultsListProps {
  businesses: Business[];
  total: number;
  processedAt: string;
}

export default function ResultsList({ businesses, total, processedAt }: ResultsListProps) {
  if (businesses.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-16 w-16 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-slate-900 dark:text-white">No results found</h3>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Try adjusting your search criteria</p>
      </div>
    );
  }

  const formattedDate = new Date(processedAt).toLocaleString();

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {total} {total === 1 ? 'Business' : 'Businesses'} Found
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Processed at {formattedDate}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business, index) => (
          <BusinessCard key={business.placeId || index} business={business} />
        ))}
      </div>
    </div>
  );
}
