import type cropModel from '@/interfaces/cropModel';
import type { SupplierOrigin } from '@/interfaces/origin/supplier-origin';

export interface CropOrigin
  extends Pick<
    cropModel,
    | 'id'
    | 'icon'
    | 'name'
    | 'cycle'
    | 'edible'
    | 'soil'
    | 'watering'
    | 'maintenance'
    | 'hardinessZone'
    | 'indoor'
    | 'propagation'
    | 'careLevel'
    | 'growthRate'
    | 'description'
    | 'cultivatedArea'
    | 'plantedDate'
    | 'expectedDate'
    | 'quantity'
    | 'cropTypeId'
    | 'cropType'
    | 'fieldCrops'
    | 'createdAt'
  > {
  cropTypeName: string;
  supplier: SupplierOrigin;
}
