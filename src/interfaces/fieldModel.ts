import locationModel from './locationModel';
import polygonModel from './polygonModel';

export default interface fieldModel {
  id?: number;
  name?: string;
  farmId?: number;
  locationId?: string;
  location?: locationModel;
  polygonApp?: polygonModel;
  area?: number;
  createdAt?: string;
  updatedAt?: string;
}
