import { Card, Statistic, Avatar, Row, Col, Skeleton } from 'antd';
import {
  UserOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
import type { FC } from 'react';

export type SummaryCardsData = {
  totalProducts?: number;
  totalUsers?: number;
  totalRevenue?: number;
  totalSales?: number;
};

export const SummaryCards: FC<{
  loading?: boolean;
  data?: SummaryCardsData;
}> = ({ loading, data }) => {
  // Fake change percent and type for demo
  const summaryData = [
    {
      title: 'Total Products',
      value: data?.totalProducts ?? 0,
      icon: (
        <ShoppingCartOutlined className='rounded-full bg-blue-100 p-2 text-xl text-blue-500' />
      ),
      change: '+2.65%',
      changeType: 'up',
    },
    {
      title: 'Total Users',
      value: data?.totalUsers ?? 0,
      icon: (
        <UserOutlined className='rounded-full bg-pink-100 p-2 text-xl text-pink-500' />
      ),
      change: '+0.34%',
      changeType: 'up',
    },
    {
      title: 'Total Revenue',
      value: data?.totalRevenue ?? 0,
      icon: (
        <DollarOutlined className='rounded-full bg-green-100 p-2 text-xl text-green-500' />
      ),
      change: '+7.68%',
      changeType: 'up',
      prefix: '$',
    },
    {
      title: 'Total Sales',
      value: data?.totalSales ?? 0,
      icon: (
        <LineChartOutlined className='rounded-full bg-purple-100 p-2 text-xl text-purple-500' />
      ),
      change: '-0.74%',
      changeType: 'down',
    },
  ];
  return (
    <Row gutter={[16, 16]}>
      {summaryData.map((item) => (
        <Col xs={24} sm={12} md={6} key={item.title}>
          <Card className='rounded-lg shadow' variant='borderless'>
            {loading ? (
              <Skeleton active paragraph={false} />
            ) : (
              <div className='flex items-center gap-4'>
                <Avatar
                  size={48}
                  icon={item.icon}
                  className='flex items-center justify-center'
                />
                <div>
                  <Statistic
                    title={
                      <span className='text-sm text-gray-500'>
                        {item.title}
                      </span>
                    }
                    value={item.value}
                    prefix={item.prefix}
                    valueStyle={{ fontWeight: 700, fontSize: 22 }}
                  />
                  {/* Fake change percent for demo */}
                  <span
                    className={`text-xs ${item.changeType === 'up' ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {item.change}
                  </span>
                </div>
              </div>
            )}
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default SummaryCards;
