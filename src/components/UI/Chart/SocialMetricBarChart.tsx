import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { socialMetricModel } from '@/interfaces';

Chart.register(...registerables);

interface SocialMetricBarChartProps {
  socialMetrics: socialMetricModel[];
}

export const SocialMetricBarChart = ({
  socialMetrics,
}: SocialMetricBarChartProps) => {
  // Generate unique colors for each dataset
  const generateColors = (count: number) =>
    Array.from({ length: count }, (_, i) => {
      const hue = (i * 360) / count; // Evenly distribute hues
      return `hsl(${hue}, 70%, 50%)`; // Bright color palette
    });

  const colors = generateColors(socialMetrics.length);

  // Prepare data for the chart
  const labels = Array.from(
    new Set(
      socialMetrics.flatMap(
        (metric) => metric.socialYears?.map((sy) => sy.year?.toString()) || [],
      ),
    ),
  ).sort();

  const datasets = socialMetrics.map((metric, index) => ({
    label: metric.seriesMetric?.name
      ? `${metric.seriesMetric.name}`
      : `Social Metric Data ${index + 1}`,
    data: labels.map(
      (label) =>
        metric.socialYears?.find((sy) => sy.year?.toString() === label)
          ?.value ?? null,
    ),
    backgroundColor: colors[index],
    borderColor: colors[index],
    borderWidth: 1,
    barThickness: 20,
    yAxisID: index === 0 ? 'y' : 'y1', // Assign different Y-axis for the second dataset
  }));

  const data: ChartData<'bar'> = {
    labels,
    datasets,
  };

  // Chart options
  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw as number;
            return `${context.label}: ${value >= 1000 ? `${value / 1000}k` : value.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Years',
          font: { size: 14 },
          color: '#9ca3af',
        },
        grid: {
          drawOnChartArea: false,
          drawTicks: true,
          color: '#e5e7eb',
          lineWidth: 1,
        },
      },
      y: {
        title: {
          display: false,
        },
        grid: {
          drawOnChartArea: false,
          drawTicks: true,
          color: '#e5e7eb',
          lineWidth: 1,
        },
        position: 'left',
      },
    },
  };

  return (
    <div>
      <h2 className='font-bold'>
        {socialMetrics[0]?.province?.name
          ? socialMetrics[0]?.province?.name + ', VN'
          : 'Social Indicators Bar Chart'}
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
};
