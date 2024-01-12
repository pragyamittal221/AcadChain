import React, { useState, useEffect } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useContract, useUserAddress } from "../../connectContract";

function GetTeacher() {
  // Initialize state
  const [teacherCode, setTeacherCode] = useState("");
  const [teacherData, setTeacherData] = useState(null);
  
  const contract = useContract();
  const userAddress = useUserAddress();


  useEffect(() => {
    if (contract) {
      console.log('Contract instance:', contract);
      console.log('User Address:', userAddress);
    }
  }, [contract]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teacherCode) {
      alert("Please enter the teacher code before submitting.");
      return;
    }

    try {
      // Call the getTeacher function from the smart contract
      const data = await contract.methods.getTeacher(teacherCode).call({from: userAddress, gas:500000000});
      setTeacherData(data);
      console.log("Teacher Data:", data);
    } catch (error) {
      console.error("Error fetching teacher data:", error);
    }
    console.log("Teacher Code:",teacherCode);
  };
  // mt-6 w-48 bg-blue-900  hover:bg-gray-700
  return (
    <div className="flex justify-center bg-gray-100 pt-12">
    <Card color="white" className="w-full max-w-2xl mx-auto p-10 bg-white rounded-xl shadow-md items-center">
      <Typography variant="h4" color="blue-gray">
        Get Teacher
      </Typography>
      <Typography color="gray" className="mt-1 font-normal"></Typography>
      <form
        className="mt-6"
        onSubmit={handleSubmit}
        style={{width:'491px'}}
      >
        <div className="mb-4 flex flex-col gap-4">
          <Input
            size="lg"
            label="Teacher Code"
            value={teacherCode}
            onChange={(e) => setTeacherCode(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
        <Button type="submit" className="mt-4 w-48 bg-blue-900  hover:bg-gray-700" >
          Get Teacher
        </Button>
        </div>
      </form>
      {teacherData && (
          <div className="mt-4">
            <Typography variant="h6" color="blue-gray">
              Teacher Info:
            </Typography>
            <Typography color="gray">
              Code: {teacherData.code}
            </Typography>
            <Typography color="gray">
              Subject Codes: {teacherData.subjectCodes.join(', ')}
            </Typography>
          </div>
        )}
    </Card>
    </div>
  );
}

export default GetTeacher;
