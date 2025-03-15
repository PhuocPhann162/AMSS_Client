import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { ReactNode } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { airPollutionType } from '@/interfaces';

Chart.register(...registerables);

interface MyDoughnutProps {
  airPollution: airPollutionType;
}

export const MyDoughnut = ({ airPollution }: MyDoughnutProps) => {
  const renderChart = (percents: number[]) => {
    const data: ChartData<'doughnut'> = {
      labels: ['CO', 'NH3', 'NO', 'NO2', 'O3', 'PM2_5', 'PM10', 'SO2'],
      datasets: [
        {
          label: '# of Votes',
          data: [
            airPollution.list[0].components.co,
            airPollution.list[0].components.nh3,
            airPollution.list[0].components.no,
            airPollution.list[0].components.no2,
            airPollution.list[0].components.o3,
            airPollution.list[0].components.pm2_5,
            airPollution.list[0].components.pm10,
            airPollution.list[0].components.so2
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(0, 123, 255, 0.2)',
            'rgba(52, 58, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(0, 123, 255, 1)',
            'rgba(52, 58, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    };

    const options: ChartOptions<'doughnut'> = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return context.label + ': ' + context.raw;
            }
          }
        }
      }
    };

    return <Doughnut options={options} data={data}></Doughnut>;
  };

  const render = (): ReactNode => {
    // const percents = props.args["percents"]
    const percents = [76, 24];

    return <span>{renderChart(percents)}</span>;
  };

  return <div>{render()}</div>;
};
