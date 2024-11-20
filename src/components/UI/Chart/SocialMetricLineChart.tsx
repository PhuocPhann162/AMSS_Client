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
  // Prepare data for the chart
  const data: ChartData<'line'> = {
    labels: socialYears.map((sy) => sy.year?.toString()),
    datasets: [
      {
        label: socialMetric ? socialMetric?.province?.name + ' ,VN' : 'Social Metric Data', // Chart label
        data: socialYears.map((sy) => sy.value ?? null), // Extract values
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill under the line
        borderWidth: 2,
        tension: 0.3, // Smooth curves
        pointRadius: 4, // Size of the points
        pointHoverRadius: 10 // Size when hovering
      }
    ]
  };

  // Chart options
  const options: ChartOptions<'line'> = {
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
        }
      }
    }
  };

  return (
    <div className='w-full'>
      <h3 className='font-bold text-brown'>{socialMetric?.seriesMetric?.name}</h3>
      <Line data={data} options={options} />
    </div>
  );
};
