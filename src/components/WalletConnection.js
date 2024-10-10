import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletConnection = ({ setWalletAddress }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [address, setAddress] = useState('');

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAddress(accounts[0]);
        setWalletConnected(true);
        setWalletAddress(accounts[0]); // Pass the wallet address to the parent component
      } else {
        alert('Please install MetaMask to use this feature.');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAddress(accounts[0]);
        setWalletAddress(accounts[0]);
      });
    }
  }, [setWalletAddress]);

  return (
    <div>
      {walletConnected ? (
        <div>Connected: {address}</div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnection;
