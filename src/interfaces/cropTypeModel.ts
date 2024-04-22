import cropModel from './cropModel';

export default interface cropTypeModel {
  id?: number;
  name?: string;
  code?: string;
  crops: cropModel[];
  createdAt?: string;
  updatedAt?: string;
}
