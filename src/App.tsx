import {
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import './App.css';
import { IApiData } from './types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Line Chart By Ajay',
      color: 'whitesmoke',
    },
  },
  color: 'whitesmoke',
  scales: {
    y: {
      ticks: { color: 'whitesmoke' },
    },
    x: {
      ticks: { color: 'whitesmoke' },
    },
  },
};

function App() {
  const [data, setData] = useState<ChartData<'line', number[], string>>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const xAxisDataPromise = await fetch(
          'https://retoolapi.dev/gDa8uC/data'
        );
        const xAxisData: IApiData[] = await xAxisDataPromise.json();

        const yAxisDataPromise = await fetch(
          'https://retoolapi.dev/o5zMs5/data'
        );
        const yAxisData: IApiData[] = await yAxisDataPromise.json();

        const xData = xAxisData.map((dt) => Math.trunc(+dt.RandomNumber) + '');
        const yData = yAxisData.map((dt) => +dt.RandomNumber);
        setData(() => ({
          labels: xData,
          datasets: [
            {
              label: 'Api Data Chart',
              data: yData,
              fill: false,
              borderColor: 'teal',
              tension: 0.1,
              backgroundColor: 'whitesmoke',
              hoverBorderColor: 'whitesmoke',
              pointBorderColor: 'whitesmoke',
              hoverBackgroundColor: 'whitesmoke',
              pointBackgroundColor: 'whitesmoke',
              pointHoverBorderColor: 'whitesmoke',
              pointHoverBackgroundColor: 'whitesmoke',
            },
          ],
        }));
      } catch (error) {
        console.log(error);
        alert('Unable to fetch data');
      }
    };
    fetchData();
  }, []);

  return <Line options={options} data={data} color='#ffffff' />;
}

export default App;
