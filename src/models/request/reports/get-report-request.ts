export type ReportType = 'daily' | 'monthly' | 'yearly';

export interface GetReportRequest {
  type: ReportType;
  year: number;
  month: number;
  endYear: number;
}
