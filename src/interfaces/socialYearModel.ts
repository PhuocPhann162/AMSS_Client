import socialMetricModel from './socialMetricModel';

export default interface socialYearModel {
  id?: string;
  socialMetricId?: string;
  year?: number;
  value?: number;
  socialMetric?: socialMetricModel;
  createdAt?: string;
  updatedAt?: string;
}
