import type { Commodity } from '@/interfaces/commodity';
import type fieldModel from '@/interfaces/fieldModel';
import type { CropOrigin } from '@/interfaces/origin/crop-origin';
import type { SupplierOrigin } from '@/interfaces/origin/supplier-origin';

export interface CommodityOrigin
  extends Pick<
    Commodity,
    | 'id'
    | 'name'
    | 'description'
    | 'specialTag'
    | 'category'
    | 'price'
    | 'image'
    | 'expirationDate'
    | 'status'
    | 'cropName'
  > {
  supplier: SupplierOrigin;
  crop: CropOrigin;
  fields: fieldModel[];
}
