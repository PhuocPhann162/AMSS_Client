import { ApiError, PlantIdentificationResponse } from '@/interfaces';
import { PlantIdentificationRequest } from '@/interfaces';
import { ApiConfig } from '@/interfaces';

const defaultConfig: Required<Pick<ApiConfig, 'baseUrl'>> = {
  baseUrl: 'https://my-api.plantnet.org/v2',
};

export class PlantIdentificationService {
  private config: ApiConfig;

  constructor(config: ApiConfig = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  async identifyPlant(
    request: PlantIdentificationRequest,
  ): Promise<PlantIdentificationResponse | undefined> {
    try {
      // Validate required parameters
      if (!request.project) {
        throw new Error('Project parameter is required');
      }

      if (!request.images || request.images.length === 0) {
        throw new Error('At least one image is required');
      }

      if (request.images.length > 5) {
        throw new Error('Maximum 5 images allowed');
      }

      // Create FormData for multipart/form-data request
      const formData = new FormData();

      // Add images
      request.images.forEach((image) => {
        formData.append('images', image);
      });

      // Add organs if specified
      if (request.organs && request.organs.length > 0) {
        if (request.organs.length !== request.images.length) {
          throw new Error('Number of organs must equal number of images');
        }
        request.organs.forEach((organ) => {
          formData.append('organs', organ);
        });
      }

      // Build query parameters
      const queryParams = new URLSearchParams();

      // Add optional parameters
      if (request.includeRelatedImages !== undefined) {
        queryParams.append(
          'include-related-images',
          request.includeRelatedImages.toString(),
        );
      }

      if (request.noReject !== undefined) {
        queryParams.append('no-reject', request.noReject.toString());
      }

      if (request.nbResults !== undefined) {
        queryParams.append('nb-results', request.nbResults.toString());
      }

      if (request.lang) {
        queryParams.append('lang', request.lang);
      }

      if (request.type) {
        queryParams.append('type', request.type);
      }

      // Add authentication
      const apiKey = request.apiKey || this.config.apiKey;
      const authenixToken =
        request.authenixAccessToken || this.config.authenixAccessToken;

      if (apiKey) {
        queryParams.append('api-key', apiKey);
      } else if (authenixToken) {
        queryParams.append('authenix-access-token', authenixToken);
      }

      // Build URL
      const url = `${this.config.baseUrl}/identify/${request.project}?${queryParams.toString()}`;

      // Make API request
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = (await response.json().catch(() => ({
          error: 'Network error',
          statusCode: response.status,
        }))) as ApiError;
        throw new Error(`API Error: ${errorData.error || response.statusText}`);
      }

      const data: PlantIdentificationResponse =
        (await response.json()) as PlantIdentificationResponse;
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  }
}

// Create a singleton instance
export const plantIdentificationService = new PlantIdentificationService({
  apiKey: import.meta.env.VITE_PLANT_NET_API_KEY as string,
});
