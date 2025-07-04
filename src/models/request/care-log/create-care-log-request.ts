import type { CareLog } from '@/interfaces/care-log/care-log';

export type CreateCareLogRequest = Pick<
  CareLog,
  'cropId' | 'fieldId' | 'type' | 'description' | 'date'
>;
