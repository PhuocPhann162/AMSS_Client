import locationModel from './locationModel';

export default interface farmModel {
  id: number;
  name: string;
  locationId: string;
  location: locationModel;
  area: number;
  createdAt: string;
  updatedAt: string;
}
