import farmModel from './farmModel';
import fieldModel from './fieldModel';
import positionModel from './positionModel';

export default interface polygonModel {
  id?: number;
  color?: string;
  farmId?: number;
  farm?: farmModel;
  fieldId?: number;
  field?: fieldModel;
  positions?: positionModel[];
}
