import farmModel from './farmModel';
import fieldModel from './fieldModel';
import positionModel from './positionModel';

export default interface polygonModel {
  id?: string;
  color?: string;
  type?: number;
  farm?: farmModel;
  field?: fieldModel;
  positions?: positionModel[];
}
