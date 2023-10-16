import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

function GetPassword() {
  // Initialize state
  const [teacherCode, setTeacherCode] = useState("");
  const [subjectCode, setSubjectCode] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      teacherCode: teacherCode,
      subjectCode: subjectCode,
    });
  };
 
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Get Passwords
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
            label="Subject Code"
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
          />
        </div>
        <Button type="submit" className="mt-6" fullWidth>
          Get Passwords
        </Button>
      </form>
    </Card>
  );
}

export default GetPassword;
