import { Card, Statistic, Skeleton } from 'antd';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import type { FC } from 'react';

Chart.register(ArcElement, Tooltip, Legend);

export type OrderStatisticsData = {
  totalOrders?: number;
  delivered?: number;
  cancelled?: number;
};

const defaultData = {
  totalOrders: 3736,
  delivered: 3200,
  cancelled: 536,
};

export const OrderStatistics: FC<{
  loading?: boolean;
  data?: OrderStatisticsData;
}> = ({ loading, data }) => {
  const stats = {
    totalOrders: data?.totalOrders ?? defaultData.totalOrders,
    delivered: data?.delivered ?? defaultData.delivered,
    cancelled: data?.cancelled ?? defaultData.cancelled,
  };
  const chartData = {
    labels: ['Delivered', 'Cancelled'],
    datasets: [
      {
        data: [stats.delivered, stats.cancelled],
        backgroundColor: ['#6366f1', '#f472b6'],
        borderWidth: 0,
      },
    ],
  };
  return (
    <Card
      className='h-full rounded-lg shadow'
      title={<span className='font-semibold'>Order Statistics</span>}
    >
      {loading ? (
        <Skeleton active paragraph={false} />
      ) : (
        <div className='flex flex-col items-center justify-center gap-2'>
          <Statistic
            title='Total Orders'
            value={stats.totalOrders}
            precision={0}
            className='mb-2'
            valueStyle={{ fontWeight: 700, fontSize: 22 }}
          />
          <div className='h-32 w-32'>
            <Doughnut
              data={chartData}
              options={{
                cutout: '70%',
                plugins: { legend: { display: false } },
              }}
            />
          </div>
          <div className='mt-2 flex gap-4'>
            <span className='flex items-center gap-1 text-xs text-gray-500'>
              <span className='inline-block h-3 w-3 rounded-full bg-indigo-500'></span>
              Delivered
            </span>
            <span className='flex items-center gap-1 text-xs text-gray-500'>
              <span className='inline-block h-3 w-3 rounded-full bg-pink-400'></span>
              Cancelled
            </span>
          </div>
        </div>
      )}
    </Card>
  );
};

export default OrderStatistics;
