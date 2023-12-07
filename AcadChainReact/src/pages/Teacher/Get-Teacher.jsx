import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

function GetTeacher() {
  // Initialize state
  const [teacherCode, setTeacherCode] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      teacherCode: teacherCode,
    });
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
    </Card>
    </div>
  );
}

export default GetTeacher;
