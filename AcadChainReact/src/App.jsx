import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin/Admin";
import Student from "./pages/Student/Student";
import Default from "./pages/Default/Default";
import Teacher from "./pages/Teacher/Teacher";
import TeacherNotApproved from "./pages/Teacher/Teacher-NotApproved";
import Navbar from "./Navbar";
import Web3 from "web3";
import AcadChainContract from "./AcadChainContract.json";

function App() {
  const [account, setAccount] = useState("0x0");
  const [contract, setContract] = useState(null);
  const [teacherRegistrationData, setTeacherRegistrationData] = useState(null);

  
  useEffect(() => {
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', function (accounts) {
        console.log('accountsChanged event fired', accounts);
        setAccount(accounts[0]);
      });
    }
  }, []);

  useEffect(() => {
    console.log('account state updated', account);
  }, [account]);
  
  useEffect(() => {
    console.log("teacherRegstrationData from app.jsx", teacherRegistrationData); 
  }, [teacherRegistrationData]);

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const selectedAccount = accounts[0];
        setAccount(selectedAccount);
        connectContract(selectedAccount);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const connectContract = async (selectedAccount) => {
    const web3 = new Web3(window.ethereum);
    const contractInstance = new web3.eth.Contract(AcadChainContract.abi, "0xEED2cC6837606ae40931105960372831f83e1020");

    setContract(contractInstance);
  };


  return (
    <div>
      <Router>
        <Navbar account={account} />
        <Routes>
          <Route path="/" element={<Default handleConnectWallet={handleConnectWallet}/>} />
          <Route path="/admin" element={<Admin contract={contract} teacherRegistrationData={teacherRegistrationData}/>} />
          <Route path="/student" element={<Student contract={contract}/>} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/teachernotapproved" element={<TeacherNotApproved setTeacherRegistrationData={setTeacherRegistrationData} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;



