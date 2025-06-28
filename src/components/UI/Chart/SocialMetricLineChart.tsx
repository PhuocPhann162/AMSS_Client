import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { socialMetricModel } from '@/interfaces';

Chart.register(...registerables);

interface SocialMetricLineChartProps {
  socialMetrics: socialMetricModel[];
}

export const SocialMetricLineChart = ({
  socialMetrics,
}: SocialMetricLineChartProps) => {
  const validSocialMetrics = Array.isArray(socialMetrics) ? socialMetrics : [];
  const labels = Array.from(
    new Set(
      validSocialMetrics
        .filter((metric) => metric.socialYears)
        .flatMap((metric) =>
          metric.socialYears?.map((sy) => sy.year?.toString()),
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
    borderColor: index === 0 ? '#9333ea' : '#f59e0b', // Màu sắc khác nhau cho từng dataset
    backgroundColor:
      index === 0 ? 'rgba(147, 51, 234, 0.1)' : 'rgba(245, 158, 11, 0.1)',
    borderWidth: 2,
    tension: 0.4,
    pointRadius: 5,
    pointHoverRadius: 8,
    fill: true,
    yAxisID: index === 0 ? 'y-axis-1' : 'y-axis-2', // Gắn dataset với trục y tương ứng
  }));

  const data: ChartData<'line'> = {
    labels,
    datasets,
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
          color: '#1f2937',
        },
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
      'y-axis-1': {
        title: {
          display: false,
        },
        grid: {
          drawOnChartArea: false,
          drawTicks: true,
          color: '#e5e7eb',
          lineWidth: 1,
        },
        position: 'left', // Trục y bên trái
      },
    },
  };

  return (
    <div>
      <h2 className='font-bold'>
        {socialMetrics[0]?.province?.name
          ? socialMetrics[0]?.province?.name + ', VN'
          : 'Social Indicators Line Chart'}
      </h2>
      <Line data={data} options={options} />
    </div>
  );
};
