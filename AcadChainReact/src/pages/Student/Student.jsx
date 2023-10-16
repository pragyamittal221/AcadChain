import React from "react";
import StudentForm from "./StudentForm";

function Student({ contract }) {
  return (
    <div className="">
      <StudentForm contract={contract}/>
    </div>
  );
}

export default Student;
