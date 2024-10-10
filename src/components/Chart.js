import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Required for chart.js to work

const Chart = ({ historicalData }) => {
  const data = {
    labels: historicalData.map(entry => entry.date), // Date labels
    datasets: [
      {
        label: 'Token Balance',
        data: historicalData.map(entry => entry.balance), // Token balance for each date
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
        tension: 0.1,
      }
    ]
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'MMM DD, YYYY',
        },
      },
      y: {
        beginAtZero: true,
      }
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
