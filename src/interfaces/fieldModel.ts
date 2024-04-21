import farmModel from './farmModel';
import locationModel from './locationModel';
import polygonModel from './polygonModel';

export default interface fieldModel {
  id?: number;
  name?: string;
  status?: string;
  farmId?: number;
  farm?: farmModel;
  locationId?: string;
  location?: locationModel;
  polygonApp?: polygonModel;
  area?: number;
  createdAt?: string;
  updatedAt?: string;
}
