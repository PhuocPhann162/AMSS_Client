import cropModel from './cropModel';

export default interface cropTypeModel {
  id?: number;
  name?: string;
  code?: string;
  type?: string;
  crops: cropModel[];
  createdAt?: string;
  updatedAt?: string;
}
