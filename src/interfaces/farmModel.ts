import locationModel from './locationModel';
import polygonModel from './polygonModel';

export default interface farmModel {
  id?: string;
  name?: string;
  ownerName?: string;
  locationId?: string;
  location?: locationModel;
  area?: number;
  polygonApp?: polygonModel;
  createdAt?: string;
  updatedAt?: string;
}
