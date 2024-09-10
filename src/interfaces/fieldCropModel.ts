import cropModel from './cropModel';
import fieldModel from './fieldModel';

export default interface fieldCropModel {
  id: string;
  fieldId: number;
  field: fieldModel;
  cropId: number;
  crop: cropModel;
}
