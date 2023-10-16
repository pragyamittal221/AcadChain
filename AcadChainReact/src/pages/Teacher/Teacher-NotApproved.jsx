import React from "react";
import Register from "./Register";

function TeacherNotApproved({setTeacherRegistrationData}) {
  return (
    <div className="">
      Teacher
      <Register setTeacherRegistrationData={setTeacherRegistrationData}/>
    </div>
  );
}

export default TeacherNotApproved;
