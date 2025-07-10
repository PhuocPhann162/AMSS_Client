export interface GetReportResponse {
  daysInMonth: number;
  label: string;
  revenueData: number[];
}

// Base interface for totals with growth rate
export interface TotalBase {
  total: number;
  growthRate: number;
}

export type TotalProducts = TotalBase;
export type TotalUsers = TotalBase;
export type TotalRevenue = TotalBase;

export interface TotalOrders {
  totalDelivered: number;
  totalCancelled: number;
}

export interface GetTotalStatisticResponse {
  totalProducts: TotalProducts;
  totalUsers: TotalUsers;
  totalRevenue: TotalRevenue;
  totalOrders: TotalOrders;
}
