import farmModel from './farmModel';
import fieldCropModel from './fieldCropModel';
import locationModel from './locationModel';
import polygonModel from './polygonModel';
import soilQualityModel from './soilQualityModel';

export default interface fieldModel {
  id?: string;
  name?: string;
  area?: number;
  status?: string;
  farmId?: string;
  internalId?: string;
  plantingFormat?: string;
  locationType?: string;
  lightProfile?: string;
  grazingRestDays?: number;
  numberOfBeds?: number;
  bedLength?: number;
  bedWidth?: number;
  farm?: farmModel;
  locationId?: string;
  location?: locationModel;
  polygonApp?: polygonModel;
  soilQuality?: soilQualityModel;
  fieldCrops?: fieldCropModel[];
  createdAt?: string;
  updatedAt?: string;
  polygonAppId?: string;
}
