import type cropTypeModel from '@/interfaces/cropTypeModel';
import type fieldCropModel from '@/interfaces/fieldCropModel';
import type { Supplier } from '@/interfaces/supplier/supplier';

export default interface cropModel {
  id: string;
  icon?: string;
  name?: string;
  cycle?: string;
  edible?: boolean;
  soil?: string;
  watering?: string;
  maintenance?: string;
  hardinessZone?: number;
  indoor?: boolean;
  propagation?: string;
  careLevel?: string;
  growthRate?: string;
  description?: string;
  quantity?: number;
  cultivatedArea?: number;
  plantedDate?: string;
  expectedDate?: string;
  cropTypeId?: string;
  cropType?: cropTypeModel;
  fieldCrops?: fieldCropModel[];
  supplier?: Supplier;
  createdAt?: string;
  updatedAt?: string;
}
