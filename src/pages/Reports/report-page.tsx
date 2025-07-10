import { useState } from 'react';
import { Row, Col } from 'antd';
import SummaryCards from './components/SummaryCards';
import SalesOverviewChart from './components/SalesOverviewChart';
import OrderStatistics from './components/OrderStatistics';
import { useGetTotalStatisticQuery } from '@/api/report-api';
import { RecentOrders } from './components/RecentOrders';
import dayjs, { Dayjs } from 'dayjs';

export const Reports = () => {
  // Default: last 30 days
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
    dayjs().subtract(29, 'day'),
    dayjs(),
  ]);
  console.log(setDateRange);

  const startDate = dateRange[0];
  const endDate = dateRange[1];

  const { data: totalStatsData, isLoading: isTotalStatsLoading } =
    useGetTotalStatisticQuery({
      startDate: startDate.toDate(),
      endDate: endDate.toDate(),
    });

  // Map API response to SummaryCardsData
  const summaryCardsData = totalStatsData
    ? {
        totalProducts: totalStatsData.result.totalProducts?.total,
        totalUsers: totalStatsData.result.totalUsers?.total,
        totalRevenue: totalStatsData.result.totalRevenue?.total,
        totalSales: totalStatsData.result.totalOrders?.totalDelivered,
      }
    : undefined;

  // Map API response to OrderStatisticsData
  const orderStatsData = totalStatsData
    ? {
        totalOrders:
          totalStatsData.result.totalOrders.totalDelivered +
          totalStatsData.result.totalOrders.totalCancelled,
        delivered: totalStatsData.result.totalOrders.totalDelivered ?? 0,
        cancelled: totalStatsData.result.totalOrders.totalCancelled ?? 0,
      }
    : undefined;

  // Fix RangePicker onChange type
  // const handleRangeChange = (values: [Dayjs | null, Dayjs | null] | null) => {
  //   if (values && values[0] && values[1]) setDateRange([values[0], values[1]]);
  // };

  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      {/* Header + Filter */}
      <div className='mb-4 flex flex-wrap items-center justify-between gap-2'>
        <div>
          <h2 className='text-2xl font-bold text-gray-800'>Market Dashboard</h2>
          <span className='text-xs text-gray-400'>Dashboards &gt; Market</span>
        </div>
        <div className='flex items-center gap-2'></div>
      </div>
      {/* Summary Cards */}
      <SummaryCards loading={isTotalStatsLoading} data={summaryCardsData} />
      <Row gutter={[16, 16]} className='mt-2'>
        {/* Main Chart + Order Stats + Upgrade */}
        <Col xs={24} lg={16}>
          <SalesOverviewChart />
        </Col>
        <Col xs={24} lg={8}>
          <OrderStatistics
            loading={isTotalStatsLoading}
            data={orderStatsData}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]} className='mt-2'>
        <Col xs={24} md={24} lg={24}>
          <RecentOrders />
        </Col>
      </Row>
    </div>
  );
};

export default Reports;
