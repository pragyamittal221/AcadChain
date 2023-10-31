import React from "react";
import Register from "./Register";

function TeacherNotApproved({contract}) {
  return (
    <div className="">
      Teacher
      <Register contract={contract}/>
    </div>
  );
}

export default TeacherNotApproved;
