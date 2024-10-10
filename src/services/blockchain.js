import { ethers } from 'ethers';

export const getTokenBalance = async (walletAddress, tokenAddress) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const tokenContract = new ethers.Contract(tokenAddress, ['function balanceOf(address owner) view returns (uint256)'], provider);
  const balance = await tokenContract.balanceOf(walletAddress);
  return balance;
};

export const fetchHistoricalBalance = async (walletAddress, tokenAddress, startDate, endDate) => {
  // Implement logic to fetch historical data based on your data source or service
  return [];
};

export const checkAllowance = async (walletAddress, tokenAddress, spenderAddress) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const tokenContract = new ethers.Contract(tokenAddress, ['function allowance(address owner, address spender) view returns (uint256)'], provider);
  const allowance = await tokenContract.allowance(walletAddress, spenderAddress);
  return ethers.utils.formatEther(allowance);
};

export const transferToken = async (walletAddress, tokenAddress, recipient, amount) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const tokenContract = new ethers.Contract(tokenAddress, ['function transfer(address to, uint256 value) returns (bool)'], signer);
  const tx = await tokenContract.transfer(recipient, ethers.utils.parseEther(amount));
  await tx.wait();
};
