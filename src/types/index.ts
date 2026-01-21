export interface BusinessInsights {
  services?: string;
  targetCustomers?: string;
  businessSize?: string;
  automationOpportunities?: string[];
  painPoints?: string[];
  uniqueSellingPoint?: string;
}

export interface Business {
  title: string | null;
  summary: string | null;
  website: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  categoryName: string | null;
  totalScore: number | null;
  reviewsCount: number | null;
  url: string | null;
  placeId: string | null;
  latitude: number | null;
  longitude: number | null;
  hasWebsite: boolean;
  contentQuality: 'none' | 'low' | 'medium' | 'high';
  businessInsights: BusinessInsights | null;
  generatedEmail: string | null;
  emailQuality: 'excellent' | 'good' | 'needs_review' | 'template' | 'unknown';
  processingPath: 'ai_full' | 'template' | 'unknown';
}

export interface ProcessingStats {
  total: number;
  aiProcessed: number;
  templateUsed: number;
  excellentEmails: number;
  needsReview: number;
}

export interface SearchResponse {
  success: boolean;
  data: {
    businesses: Business[];
    total: number;
    stats?: ProcessingStats;
  };
  processedAt: string;
}

export interface SearchFormData {
  location: string;
  search_query: string;
  max_number_of_results: number;
}
