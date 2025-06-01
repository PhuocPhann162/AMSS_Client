// Types for Plant Identification API

// Enum types for better type safety
export type ModelType = 'kt' | 'legacy';
export type Language =
  | 'en'
  | 'fr'
  | 'es'
  | 'pt'
  | 'de'
  | 'it'
  | 'ar'
  | 'cs'
  | 'nl'
  | 'sk'
  | 'zh'
  | 'ru'
  | 'tr'
  | 'pl'
  | 'uk'
  | 'he'
  | 'el'
  | 'fi'
  | 'id'
  | 'ms'
  | 'ca'
  | 'ja'
  | 'hu'
  | 'hr'
  | 'da'
  | 'ro'
  | 'bg'
  | 'nb'
  | 'sl'
  | 'sv'
  | 'et'
  | 'eu'
  | 'ur'
  | 'ml'
  | 'cy'
  | 'ku'
  | 'gl'
  | 'eo'
  | 'sa'
  | 'tz'
  | 'zh-tw'
  | 'pt-br'
  | 'hi'
  | 'de-at'
  | 'sr'
  | 'zh-hant'
  | 'bn'
  | 'fa'
  | 'be'
  | 'oc'
  | 'lt'
  | 'en-au'
  | 'br';
export type OrganType =
  | 'leaf'
  | 'flower'
  | 'fruit'
  | 'bark'
  | 'auto'
  | 'habit'
  | 'other';

// Request interface
export interface PlantIdentificationRequest {
  // Required parameters
  project: string;
  images: File[];

  // Optional query parameters
  includeRelatedImages?: boolean;
  noReject?: boolean;
  nbResults?: number;
  lang?: Language;
  type?: ModelType;
  apiKey?: string;
  authenixAccessToken?: string;

  // Form data parameters
  organs?: OrganType[];
}

// Response interfaces
export interface Species {
  species: {
    scientificNameWithoutAuthor: string;
    scientificNameAuthorship: string;
    scientificName: string;
    genus: {
      scientificNameWithoutAuthor: string;
      scientificNameAuthorship: string;
      scientificName: string;
    };
    family: {
      scientificNameWithoutAuthor: string;
      scientificNameAuthorship: string;
      scientificName: string;
    };
    commonNames: string[];
  };
  images: {
    organ: string;
    author: string;
    license: string;
    citation: string;
  }[];
  score: number;
  gbif?: {
    id: number;
  };
  powo?: {
    id: string;
  };
}

export interface PlantIdentificationResponse {
  query: {
    project: string;
    images: Array<{
      organ: string;
      id: number;
    }>;
    modifiers: string[];
    similarImages: boolean;
  };
  language: string;
  preferedReferential: string;
  bestMatch: string;

  results: Species[];
  version: string;
  remainingIdentificationRequests: number;
  predictedOrgans: {
    image: string;
    organ: string;
    filename: string;
    score: number;
  }[];
}

// Error response interface
export interface ApiError {
  error: string;
  message?: string;
  statusCode?: number;
}

// API Configuration
export interface ApiConfig {
  baseUrl?: string;
  apiKey?: string;
  authenixAccessToken?: string;
}
