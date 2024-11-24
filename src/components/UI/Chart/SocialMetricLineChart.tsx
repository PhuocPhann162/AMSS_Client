import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { socialMetricModel } from '~/interfaces';
import { SocialMetricDataChart } from '~/models';

Chart.register(...registerables);

interface SocialMetricLineChartProps {
  socialYears: SocialMetricDataChart[];
  socialMetric?: socialMetricModel;
}

export const SocialMetricLineChart = ({ socialYears, socialMetric }: SocialMetricLineChartProps) => {
  const data: ChartData<'line'> = {
    labels: socialYears.map((sy) => sy.year?.toString()),
    datasets: [
      {
        label: socialMetric ? `${socialMetric?.province?.name}, VN` : 'Social Metric Data',
        data: socialYears.map((sy) => sy.value ?? null),
        borderColor: '#9333ea',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
        fill: true
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14
          },
          color: '#1f2937'
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw as number;
            return `${context.label}: ${value >= 1000 ? `${value / 1000}k` : value.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          font: { size: 14 },
          color: '#9ca3af'
        },

        grid: {
          drawOnChartArea: false,
          drawTicks: true,
          color: '#e5e7eb',
          lineWidth: 1
        }
      },
      y: {
        title: {
          display: true,
          font: { size: 14 },
          color: '#9ca3af'
        },

        grid: {
          drawOnChartArea: false,
          drawTicks: true,
          color: '#e5e7eb',
          lineWidth: 1
        }
      }
    }
  };

  return (
    <div className='w-full'>
      <h3 className='font-bold text-gray-700 mb-4'>{socialMetric?.seriesMetric?.name}</h3>
      <Line data={data} options={options} />
    </div>
  );
};
