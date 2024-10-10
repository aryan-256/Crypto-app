import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const EtherscanAPIKey = '2CVVZF935VXQVG8IU3WNFJDG7YZEU5PCBI'; // Replace with your actual Etherscan API Key

const TransactionHistory = ({ walletAddress }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const response = await fetch(
          `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${EtherscanAPIKey}`
        );
        const data = await response.json();
        if (data.status === "1") {
          setTransactions(data.result); // Update state with fetched transactions
        } else {
          console.error('Failed to fetch transactions:', data.message);
        }
      } catch (error) {
        console.error('Error fetching transaction history:', error);
      }
    };

    if (walletAddress) {
      fetchTransactionHistory();
    }
  }, [walletAddress]);

  return (
    <div>
      <h3>Transaction History for {walletAddress}</h3>
      {transactions.length === 0 ? (
        <p>No transactions found or wallet not connected.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Hash</th>
              <th>From</th>
              <th>To</th>
              <th>Value (ETH)</th>
              <th>Block</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index}>
                <td>{tx.hash}</td>
                <td>{tx.from}</td>
                <td>{tx.to}</td>
                <td>{parseFloat(ethers.utils.formatEther(tx.value)).toFixed(4)}</td>
                <td>{tx.blockNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionHistory;
