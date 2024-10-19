import cropModel from './cropModel';
import fieldModel from './fieldModel';

export default interface fieldCropModel {
  id: string;
  fieldId: string;
  field: fieldModel;
  cropId: string;
  crop: cropModel;
}
