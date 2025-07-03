import { Card } from 'antd';
import { Bar } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import type { FC } from 'react';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
);

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const salesData = {
  labels: months,
  datasets: [
    {
      type: 'line' as const,
      label: 'Growth',
      data: [120, 200, 150, 300, 250, 400, 350, 500, 450, 600, 550, 700],
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99,102,241,0.1)',
      tension: 0.4,
      fill: true,
      pointRadius: 4,
    },
    {
      type: 'bar' as const,
      label: 'Profit',
      data: [80, 150, 100, 200, 180, 250, 220, 300, 270, 350, 320, 400],
      backgroundColor: '#34d399',
      borderRadius: 6,
      barPercentage: 0.5,
    },
    {
      type: 'bar' as const,
      label: 'Sales',
      data: [100, 180, 120, 250, 200, 300, 260, 350, 300, 400, 370, 450],
      backgroundColor: '#f472b6',
      borderRadius: 6,
      barPercentage: 0.5,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: true, position: 'top' as const },
    tooltip: { mode: 'index' as const, intersect: false },
  },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true, grid: { color: '#f0f0f0' } },
  },
};

export const SalesOverviewChart: FC = () => (
  <Card
    className='h-full rounded-lg shadow'
    title={<span className='font-semibold'>Sales Overview</span>}
    extra={
      <span className='cursor-pointer text-xs text-gray-400'>Sort by</span>
    }
  >
    <div className='h-72'>
      <Bar data={salesData} options={options} />
    </div>
  </Card>
);

export default SalesOverviewChart;
