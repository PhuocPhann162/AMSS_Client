import cropModel from './cropModel';

export default interface cropTypeModel {
  id?: string;
  name?: string;
  code?: string;
  type?: string;
  crops: cropModel[];
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
