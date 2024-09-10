import polygonModel from './polygonModel';

export default interface positionModel {
  id?: string;
  lat?: number;
  lng?: number;
  polygonId?: number;
  polygon?: polygonModel;
}
