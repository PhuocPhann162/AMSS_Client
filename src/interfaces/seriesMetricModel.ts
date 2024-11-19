import socialMetricModel from './socialMetricModel';

export default interface seriesMetricModel {
  id: string;
  name?: string;
  code?: number;
  socialMetrics: socialMetricModel[];
  createdAt?: string;
  updatedAt?: string;
}
