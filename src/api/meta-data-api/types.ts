import { type ApiResponse } from '@/interfaces/apiResponse';
import { type Province, type Country } from '@/interfaces/meta-data';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetCountriesResponse extends ApiResponse<Country[]> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetProvincesResponse extends ApiResponse<Province[]> {}
