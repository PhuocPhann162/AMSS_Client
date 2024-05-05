import pointModel from './pointModel';

export default interface createPolygonAgroModel {
  name?: string;
  geo_json?: {
    type?: string;
    properties?: {
      name?: string;
    };
    geometry?: {
      type?: string;
      coordinates?: [pointModel[]];
    };
  };
}
