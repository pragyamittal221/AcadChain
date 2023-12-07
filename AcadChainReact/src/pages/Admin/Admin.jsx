import React, { useState, useEffect } from "react";
// import data from "./PendingTeacher";
import TeacherReview from "./TeacherReview";
import IPFSUploader from "./IPFSUploader";
import Teacher from "./../Teacher/Teacher";

function Admin({contract}) {
  
  return (
    <div className="bg-gray-100 pb-14">
      <Teacher />
      <IPFSUploader />
      {<TeacherReview contract={contract} /> }
    </div>
  );
}

export default Admin;
