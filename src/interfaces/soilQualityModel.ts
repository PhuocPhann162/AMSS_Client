import fieldModel from './fieldModel';

export default interface soilQualityModel {
  id?: number;
  infoTime?: Date;
  chlorophyll?: number;
  iron?: number;
  nitrate?: number;
  phyto?: number;
  oxygen?: number;
  pH?: number;
  phytoplankton?: number;
  silicate?: number;
  salinity?: number;
  soilMoisture?: number;
  soilMoisture10cm?: number;
  soilMoisture40cm?: number;
  soilMoisture100cm?: number;
  soilTemperature?: number;
  soilTemperature10cm?: number;
  soilTemperature40cm?: number;
  soilTemperature100cm?: number;
  fieldId?: number | null;
  field?: fieldModel;
}
