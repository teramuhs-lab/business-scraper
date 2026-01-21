export interface BusinessInsights {
  services?: string;
  targetCustomers?: string;
  automationOpportunities?: string[];
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
  businessInsights: BusinessInsights | null;
  generatedEmail: string | null;
}

export interface SearchResponse {
  success: boolean;
  data: {
    businesses: Business[];
    total: number;
  };
  processedAt: string;
}

export interface SearchFormData {
  location: string;
  search_query: string;
  max_number_of_results: number;
}
