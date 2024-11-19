import countryContinentModel from './countryContinentModel';
import socialMetricModel from './socialMetricModel';

export default interface provinceModel {
  id?: string;
  code?: string;
  countryCode?: string;
  name?: string;
  category?: string;
  countryContinentId?: string;
  countryContinent: countryContinentModel;
  socialMetrics: socialMetricModel[];
  createdAt?: string;
  updatedAt?: string;
}
