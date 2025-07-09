import type { CareLogType } from '@/interfaces/care-log/care-log-type';
import type cropModel from '@/interfaces/cropModel';
import type fieldModel from '@/interfaces/fieldModel';
import type { User } from '@/interfaces/user/user';

export interface CareLog {
  id: string;
  type: CareLogType;
  description: string;
  date: string;
  createdBy: User;
  createdById: string;
  crop: cropModel;
  cropId: string;
  field: fieldModel;
  fieldId: string;

  createdAt?: string;
}
