import { Row, Col, DatePicker, Button } from 'antd';
import SummaryCards from './components/SummaryCards';
import SalesOverviewChart from './components/SalesOverviewChart';
import OrderStatistics from './components/OrderStatistics';
import TopSellingCategories from './components/TopSellingCategories';
import LatestTransactions from './components/LatestTransactions';
import RecentActivity from './components/RecentActivity';
import RecentOrders from './components/RecentOrders';
import {
  useGetRevenueQuery,
  useGetOrderStatisticQuery,
} from '@/api/report-api';

export const Reports = () => {
  const { data: revenueData, isLoading: isRevenueLoading } =
    useGetRevenueQuery();
  const { data: orderStatsData, isLoading: isOrderStatsLoading } =
    useGetOrderStatisticQuery();

  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      {/* Header + Filter */}
      <div className='mb-4 flex flex-wrap items-center justify-between gap-2'>
        <div>
          <h2 className='text-2xl font-bold text-gray-800'>Market Dashboard</h2>
          <span className='text-xs text-gray-400'>Dashboards &gt; Market</span>
        </div>
        <div className='flex items-center gap-2'>
          <DatePicker.RangePicker className='rounded' />
          <Button type='primary'>Filter</Button>
          <Button>Share</Button>
        </div>
      </div>
      {/* Summary Cards */}
      <SummaryCards loading={isRevenueLoading} data={revenueData} />
      <Row gutter={[16, 16]} className='mt-2'>
        {/* Main Chart + Order Stats + Upgrade */}
        <Col xs={24} lg={16}>
          <SalesOverviewChart />
        </Col>
        <Col xs={24} lg={8}>
          <OrderStatistics
            loading={isOrderStatsLoading}
            data={orderStatsData}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]} className='mt-2'>
        <Col xs={24} md={12} lg={8}>
          <TopSellingCategories />
        </Col>
        <Col xs={24} md={12} lg={8}>
          <LatestTransactions />
        </Col>
        <Col xs={24} md={12} lg={8}>
          <RecentActivity />
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
