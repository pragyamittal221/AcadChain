import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useContract, useUserAddress } from "../../connectContract";

function GetPassword() {
  const [teacherCode, setTeacherCode] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [passwords, setPasswords] = useState(null);

  const contract = useContract();
  const userAddress = useUserAddress();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teacherCode || !subjectCode) {
      alert("Please enter both the teacher code and subject code before submitting.");
      return;
    }

    try {
      // Call the getPasswords function from the smart contract
      const data = await contract.methods.getPasswords(teacherCode, subjectCode).call({from: userAddress});
      setPasswords(data);
      console.log("Passwords:", data);
    } catch (error) {
      console.error("Error fetching passwords:", error);
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 pt-12">
      <Card color="white" className="w-full max-w-2xl mx-auto p-10 bg-white rounded-xl shadow-md items-center">
        <Typography variant="h4" color="blue-gray">
          Get Passwords
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit} style={{width:'491px'}}>
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Teacher Code"
              value={teacherCode}
              onChange={(e) => setTeacherCode(e.target.value)}
            />
            <Input
              size="lg"
              label="Subject Code"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <Button type="submit" className="mt-4 w-48 bg-blue-900 hover:bg-gray-700">
              Get Passwords
            </Button>
          </div>
        </form>
        {passwords && Array.isArray(passwords) && (passwords.length > 0) && (
        <div className="mt-4">
          <Typography variant="h6" color="blue-gray">
            Passwords:
          </Typography>
          <Typography color="gray">
            {passwords.join(', ')}
          </Typography>
        </div>
      )}
      </Card>
    </div>
  );
}

export default GetPassword;
