import type { ApiResponse, Country } from '@/interfaces';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetCountriesResponse extends ApiResponse<Country[]> {}
