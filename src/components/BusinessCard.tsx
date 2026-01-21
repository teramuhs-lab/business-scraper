'use client';

import { useState } from 'react';
import { Business } from '@/types';

interface BusinessCardProps {
  business: Business;
}

export default function BusinessCard({ business }: BusinessCardProps) {
  const [showEmail, setShowEmail] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    if (business.generatedEmail) {
      navigator.clipboard.writeText(business.generatedEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
            {business.title || 'Unknown Business'}
          </h3>
          {business.totalScore && (
            <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded-lg">
              <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                {business.totalScore.toFixed(1)}
              </span>
              {business.reviewsCount && (
                <span className="text-xs text-amber-600 dark:text-amber-500">
                  ({business.reviewsCount})
                </span>
              )}
            </div>
          )}
        </div>

        {business.categoryName && (
          <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full mb-3">
            {business.categoryName}
          </span>
        )}

        {business.summary && (
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
            {business.summary}
          </p>
        )}

        <div className="space-y-2 text-sm">
          {business.address && (
            <div className="flex items-start gap-2 text-slate-500 dark:text-slate-400">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{business.address}</span>
            </div>
          )}

          {business.phone && (
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href={`tel:${business.phone}`} className="hover:text-blue-600 transition-colors">
                {business.phone}
              </a>
            </div>
          )}

          {business.email && (
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href={`mailto:${business.email}`} className="hover:text-blue-600 transition-colors">
                {business.email}
              </a>
            </div>
          )}
        </div>

        {/* AI Insights */}
        {business.businessInsights && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
            <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-2 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/>
              </svg>
              AI Insights
            </div>
            {business.businessInsights.services && (
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                <span className="font-medium">Services:</span> {business.businessInsights.services}
              </p>
            )}
            {business.businessInsights.automationOpportunities && business.businessInsights.automationOpportunities.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {business.businessInsights.automationOpportunities.slice(0, 3).map((opp, i) => (
                  <span key={i} className="px-2 py-0.5 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">
                    {opp}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Generated Email */}
        {business.generatedEmail && (
          <div className="mt-4">
            <button
              onClick={() => setShowEmail(!showEmail)}
              className="w-full py-2 px-4 text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {showEmail ? 'Hide' : 'View'} Generated Email
            </button>

            {showEmail && (
              <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg relative">
                <button
                  onClick={copyEmail}
                  className="absolute top-2 right-2 p-1.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 bg-white dark:bg-slate-800 rounded shadow-sm"
                  title="Copy email"
                >
                  {copied ? (
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
                <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap pr-8">
                  {business.generatedEmail}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          {business.website && (
            <a
              href={business.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 px-4 text-center text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              Website
            </a>
          )}
          {business.url && (
            <a
              href={business.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 px-4 text-center text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View on Maps
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
