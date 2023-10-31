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
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Register
      </Typography>
      <Typography color="gray" className="mt-1 font-normal"></Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 flex flex-col gap-6">
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
        <Button type="submit" className="mt-6" fullWidth>
          Submit
        </Button>
      </form>
    </Card>
  );
}

export default Register;
