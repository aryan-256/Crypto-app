import React, { useState } from 'react';
import { ethers } from 'ethers';
import { getTokenBalance } from '../services/blockchain';

const WatchList = ({ walletAddress, setSelectedToken }) => {
  const [tokens, setTokens] = useState([]);
  const [newToken, setNewToken] = useState('');

  const addToken = async () => {
    if (newToken && walletAddress) {
      const balance = await getTokenBalance(walletAddress, newToken);
      setTokens([...tokens, { address: newToken, balance }]);
      setNewToken('');
    }
  };

  const selectToken = (tokenAddress) => {
    setSelectedToken(tokenAddress);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Token Contract Address"
        value={newToken}
        onChange={(e) => setNewToken(e.target.value)}
      />
      <button onClick={addToken}>Add Token</button>

      <table>
        <thead>
          <tr>
            <th>Token Address</th>
            <th>Balance</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => (
            <tr key={index}>
              <td>{token.address}</td>
              <td>{ethers.utils.formatEther(token.balance)}</td>
              <td>
                <button onClick={() => selectToken(token.address)}>Select</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WatchList;
