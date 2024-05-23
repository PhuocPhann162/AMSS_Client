import cropModel from './cropModel';
import fieldModel from './fieldModel';

export default interface fieldCropModel {
  id: number;
  fieldId: number;
  field: fieldModel;
  cropId: number;
  crop: cropModel;
}
