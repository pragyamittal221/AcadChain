import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

function Register({contract}) {
  // Initialize state
  const [teacherCode, setTeacherCode] = useState("");
  const [subjectCodes, setSubjectCodes] = useState("");
  const [studentCounts, setStudentCounts] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const allFieldsFilled = teacherCode && subjectCodes && studentCounts;
    if (!allFieldsFilled) {
      alert("Please fill all fields before submitting.");
      return;
    }

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const userAddress = accounts[0];
    
    await contract.methods.storeTeacherRegistrationData(
      userAddress,
      teacherCode,
      subjectCodes,
      studentCounts
    ).send({ from: userAddress });
  
    console.log("Ths is registration data", registrationData);
  };
 
  return (
    <div className="flex justify-center bg-gray-100 pt-40">
      <Card color="white" className="w-full max-w-2xl mx-auto p-10 bg-white rounded-xl shadow-md items-center">
        <Typography variant="h4" color="blue-gray">
          Register
        </Typography>
        <Typography color="gray" className="mt-1 font-normal"></Typography>
        
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
          style={{width:'491px'}}
        >
          <div className="flex flex-col gap-8">
            <Input
              size="lg"
              label="Teacher Code"
              value={teacherCode}
              onChange={(e) => setTeacherCode(e.target.value)}
            />
            <Input
              size="lg"
              label="Subject Codes (comma separated)"
              value={subjectCodes}
              onChange={(e) => setSubjectCodes(e.target.value)}
            />
            <Input
              size="lg"
              label="Student Counts (comma separated)"
              value={studentCounts}
              onChange={(e) => setStudentCounts(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <Button type="submit" className="mt-8 w-48 bg-blue-900  hover:bg-gray-700"  fullWidth>
              Submit
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Register;
