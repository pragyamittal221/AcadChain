import React from "react";
import GetTeacher from "./Get-Teacher";
import GetPassword from "./Get-Password";
import GetReviews from "./Get-Review";
import Register from "./Register";

function Teacher() {
  return (
    <div className="">
      Teacher
      <GetTeacher />
      <GetPassword />
      <GetReviews />
    </div>
  );
}

export default Teacher;
