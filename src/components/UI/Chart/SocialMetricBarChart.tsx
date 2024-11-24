import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { socialMetricModel } from '~/interfaces';
import { SocialMetricDataChart } from '~/models';

Chart.register(...registerables);

interface SocialMetricBarChartProps {
  socialYears: SocialMetricDataChart[];
  socialMetric?: socialMetricModel;
}

export const SocialMetricBarChart = ({ socialYears, socialMetric }: SocialMetricBarChartProps) => {
  // Prepare data for the chart
  const data: ChartData<'bar'> = {
    labels: socialYears.map((sy) => sy.year?.toString()),
    datasets: [
      {
        label: socialMetric ? socialMetric?.province?.name + ' ,VN' : 'Social Metric Data',
        data: socialYears.map((sy) => sy.value ?? null),
        backgroundColor: 'rgba(150, 75, 0, 0.2)',
        borderColor: 'rgba(150, 75, 0, 1)',
        borderWidth: 2,
        barThickness: 20,
        hoverBackgroundColor: 'rgba(150, 75, 0, 0.6)',
        hoverBorderColor: 'rgba(150, 75, 0, 1)'
      }
    ]
  };

  // Chart options
  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
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
          display: true
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
          display: true
        },
        beginAtZero: true
      }
    }
  };

  return (
    <div className='w-full max-w-4xl'>
      <h3 className='font-bold text-brown px-6'>{socialMetric?.seriesMetric?.name}</h3>
      <Bar data={data} options={options} />
    </div>
  );
};
