import cropTypeModel from './cropTypeModel';
import fieldModel from './fieldModel';

export default interface cropModel {
  id?: number;
  icon?: string;
  name?: string;
  description?: string;
  quantity?: number;
  cultivatedArea?: number;
  plantedDate?: string;
  expectedDate?: string;
  cropTypeId?: number;
  cropType?: cropTypeModel;
  fieldId?: number;
  field?: fieldModel;
  createdAt?: string;
  updatedAt?: string;
}
