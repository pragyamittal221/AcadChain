import React from "react";
import StudentForm from "./StudentForm";
import IPFSRetriever from "./IPFSRetriever";

function Student({ contract }) {
  return (
    <div className="bg-gray-100 pb-14">
      <StudentForm contract={contract}/>
      <IPFSRetriever/>
    </div>
  );
}

export default Student;
