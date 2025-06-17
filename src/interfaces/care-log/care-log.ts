import type { CareLogType } from '@/interfaces/care-log/care-log-type';

export interface CareLog {
  id: string;
  type: CareLogType;
  description: string;
  date: string;
  cropId: string;
  fieldId: string;
  createdBy: string;
}
