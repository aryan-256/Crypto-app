import React, { useState } from 'react';
import { transferToken } from '../services/blockchain';

const TokenTransfer = ({ walletAddress, token }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleTransfer = async () => {
    await transferToken(walletAddress, token, recipient, amount);
  };

  return (
    <div>
      <h3>Transfer {token}</h3>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleTransfer}>Transfer</button>
    </div>
  );
};

export default TokenTransfer;
