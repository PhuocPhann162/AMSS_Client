import farmModel from './farmModel';
import locationModel from './locationModel';
import polygonModel from './polygonModel';
import soilQualityModel from './soilQualityModel';

export default interface fieldModel {
  id?: number;
  name?: string;
  area?: number;
  status?: string;
  farmId?: number;
  farm?: farmModel;
  locationId?: string;
  location?: locationModel;
  polygonApp?: polygonModel;
  soilQuality?: soilQualityModel;
  createdAt?: string;
  updatedAt?: string;
}
