import React, { useState } from 'react';
import { checkAllowance } from '../services/blockchain';

const Allowance = ({ walletAddress, token }) => {
  const [spenderAddress, setSpenderAddress] = useState('');
  const [allowance, setAllowance] = useState('');

  const fetchAllowance = async () => {
    const result = await checkAllowance(walletAddress, token, spenderAddress);
    setAllowance(result);
  };

  return (
    <div>
      <h3>Check Allowance for {token}</h3>
      <input
        type="text"
        placeholder="Enter Spender Address"
        value={spenderAddress}
        onChange={(e) => setSpenderAddress(e.target.value)}
      />
      <button onClick={fetchAllowance}>Check Allowance</button>
      {allowance && <p>Allowance: {allowance}</p>}
    </div>
  );
};

export default Allowance;
