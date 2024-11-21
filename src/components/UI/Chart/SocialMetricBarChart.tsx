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
        label: socialMetric ? socialMetric?.province?.name + ' ,VN' : 'Social Metric Data', // Chart label
        data: socialYears.map((sy) => sy.value ?? null), // Extract values
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)', // Border color for bars
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar hover color
        hoverBorderColor: 'rgba(75, 192, 192, 1)' // Border hover color
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
          label: (context) => `${context.label}: ${context.raw}` // Customize tooltip
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year' // X-axis title
        }
      },
      y: {
        title: {
          display: true,
          text: 'Value' // Y-axis title
        },
        beginAtZero: true // Ensures y-axis starts at 0
      }
    }
  };

  return (
    <div className='w-full'>
      <h3 className='font-bold text-brown'>{socialMetric?.seriesMetric?.name}</h3>
      <Bar data={data} options={options} />
    </div>
  );
};
