import React from "react";
import Register from "./Register";

function TeacherNotApproved({contract}) {
  return (
    <div className="bg-gray-100 pb-40">
      <Register contract={contract}/>
    </div>
  );
}

export default TeacherNotApproved;
