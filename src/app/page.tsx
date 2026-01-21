'use client';

import { useState } from 'react';
import SearchForm from '@/components/SearchForm';
import ResultsList from '@/components/ResultsList';
import { SearchFormData, SearchResponse, Business, ProcessingStats } from '@/types';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{
    businesses: Business[];
    total: number;
    processedAt: string;
    stats?: ProcessingStats;
  } | null>(null);

  const handleSearch = async (formData: SearchFormData) => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: SearchResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error((data as any).error || 'Failed to search businesses');
      }

      setResults({
        businesses: data.data.businesses,
        total: data.data.total,
        processedAt: data.processedAt,
        stats: data.data.stats,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Business Scraper
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Search for local businesses and get AI-powered summaries from Google Maps data
          </p>
        </div>

        <SearchForm onSearch={handleSearch} isLoading={isLoading} />

        {isLoading && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <svg className="animate-spin h-6 w-6 text-blue-600" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <div className="text-left">
                <p className="font-medium text-blue-900 dark:text-blue-100">Searching businesses...</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">This may take a moment while we gather AI summaries</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-800 dark:text-red-200 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {results && !isLoading && (
          <div className="mt-12">
            {results.stats && (
              <div className="mb-6 flex flex-wrap gap-3 justify-center">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                  {results.stats.total} businesses
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                  {results.stats.aiProcessed} AI-analyzed
                </span>
                {results.stats.templateUsed > 0 && (
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm">
                    {results.stats.templateUsed} templates
                  </span>
                )}
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
                  {results.stats.excellentEmails} excellent emails
                </span>
              </div>
            )}
            <ResultsList
              businesses={results.businesses}
              total={results.total}
              processedAt={results.processedAt}
            />
          </div>
        )}
      </div>
    </main>
  );
}
