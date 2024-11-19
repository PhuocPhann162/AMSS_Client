import provinceModel from './provinceModel';
import seriesMetricModel from './seriesMetricModel';
import socialYearModel from './socialYearModel';

export default interface socialMetricModel {
  id?: string;
  seriesMetricId?: string;
  provinceId?: string;
  province?: provinceModel;
  seriesMetric?: seriesMetricModel;
  socialYears?: socialYearModel[];
}
