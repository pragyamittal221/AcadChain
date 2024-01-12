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
  // const [isTeacher, setIsTeacher] = useState(false);
  
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

  // Update the contract address everytime the contract is deployed afresh.
  const connectContract = async (selectedAccount) => {
    const web3 = new Web3(window.ethereum);
    const contractInstance = new web3.eth.Contract(AcadChainContract.abi, "0x3B67D809081B45f3794fed038134f0BB8C6bf650");
    // const isTeacher = await contractInstance.methods.isTeacher(selectedAccount).call();
    // setIsTeacher(isTeacher);
    setContract(contractInstance);
  };

  return (
    <div>
      <Router>
        <Navbar account={account} contract={contract} />
        <Routes>
          <Route path="/" element={<Default handleConnectWallet={handleConnectWallet}/>} />
          <Route path="/admin" element={<Admin contract={contract} />} />
          <Route path="/student" element={<Student contract={contract}/>} />
          {/* <Route path="/teacher" element={isTeacher ? <Teacher /> : <TeacherNotApproved contract={contract}/>} /> */}
          <Route path="/teacher" element={<Teacher contract={contract}/>} />
          <Route path="/teachernotapproved" element={<TeacherNotApproved contract={contract}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;




