// useContract.js
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import AcadChainContract from './AcadChainContract.json';

export function useContract() {
  const [contract, setContract] = useState(null);

  useEffect( () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const contractInstance = new web3.eth.Contract(AcadChainContract.abi, "0x3B67D809081B45f3794fed038134f0BB8C6bf650");
      setContract(contractInstance);
    }
  }, []);

  return contract;
}

export function useUserAddress() {
  const [userAddress, setUserAddress] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      web3.eth.getAccounts().then(accounts => {
        if (accounts.length > 0) {
          setUserAddress(accounts[0]);
        }
      });
    }

    console.log("User address from hook:", userAddress);
  }, []);

  return userAddress;
}