import React, { useState } from 'react';
import WalletConnection from './components/WalletConnection';
import WatchList from './components/WatchList';
import HistoricalData from './components/HistoricalData';
import Allowance from './components/Allowance';
import TokenTransfer from './components/TokenTransfer';
import TransactionHistory from './components/TransactionHistory';

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [selectedToken, setSelectedToken] = useState(null);

  return (
    <div className="App">
      <h1>Crypto-Portfolio App</h1>
      
      {/* Wallet Connection */}
      <WalletConnection setWalletAddress={setWalletAddress} />
      
      {/* Show features only if wallet is connected */}
      {walletAddress ? (
        <>
          {/* Watch List - Tokens */}
          <WatchList walletAddress={walletAddress} setSelectedToken={setSelectedToken} />
          
          {/* Historical Data for selected token */}
          {selectedToken && (
            <HistoricalData walletAddress={walletAddress} token={selectedToken} />
          )}
          
          {/* Check Allowance */}
          {selectedToken && (
            <Allowance walletAddress={walletAddress} token={selectedToken} />
          )}
          
          {/* Token Transfer */}
          {selectedToken && (
            <TokenTransfer walletAddress={walletAddress} token={selectedToken} />
          )}
          {/* Transaction History */}
          <TransactionHistory walletAddress={walletAddress} />
        </>
      ) : (
        <p>Please connect your wallet to access features.</p>
      )}
    </div>
  );
};

export default App;
