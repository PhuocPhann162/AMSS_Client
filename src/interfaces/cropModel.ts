import cropTypeModel from './cropTypeModel';

export default interface cropModel {
  id?: number;
  icon?: string;
  name?: string;
  quantity?: number;
  cultivatedArea?: number;
  plantedDate?: string;
  expectedDate?: string;
  cropTypeId?: number;
  cropType?: cropTypeModel;
  fieldId?: number;
  createdAt?: string;
  updatedAt?: string;
}
