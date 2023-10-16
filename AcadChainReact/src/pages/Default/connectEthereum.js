// ethereum.js

import Web3 from "web3";

const connectToMetaMask = async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.enable();
      const web3 = new Web3(window.ethereum);
      return web3;
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      return null;
    }
  } else {
    console.error("MetaMask is not installed or not detected.");
    return null;
  }
};

const getContractInstance = (web3, contractAddress, contractAbi) => {
  return new web3.eth.Contract(contractAbi, contractAddress);
};

export { connectToMetaMask, getContractInstance };
