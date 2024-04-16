import polygonModel from './polygonModel';

export default interface positionModel {
  id?: number;
  lat?: number;
  lng?: number;
  polygonId?: number;
  polygon?: polygonModel;
}
