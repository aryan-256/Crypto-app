import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchHistoricalBalance } from '../services/blockchain';
import Chart from './Chart'; // Import Chart.js

const HistoricalData = ({ walletAddress, token }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [historicalData, setHistoricalData] = useState([]);

  const fetchData = async () => {
    const data = await fetchHistoricalBalance(walletAddress, token, startDate, endDate);
    setHistoricalData(data);
  };

  return (
    <div>
      <h3>Historical Balance for {token}</h3>
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      <button onClick={fetchData}>Fetch Data</button>
      
      {/* Chart to display historical data */}
      {historicalData.length > 0 && <Chart historicalData={historicalData} />}
    </div>
  );
};

export default HistoricalData;
