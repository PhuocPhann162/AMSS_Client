import farmModel from './farmModel';
import positionModel from './positionModel';

export default interface polygonModel {
  id?: number;
  color?: string;
  farmId?: number;
  farm?: farmModel;
  positions?: positionModel[];
}
