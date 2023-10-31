import React, { useState, useEffect } from "react";
import data from "./PendingTeacher";
import TeacherReview from "./TeacherReview";
import PdfUploadForm from "./PdfUploadForm";
import Teacher from "./../Teacher/Teacher";

function Admin({contract}) {
  
  return (
    <div className="">
      Admin
      <Teacher />
      <PdfUploadForm />
      {/* {<TeacherReview contract={contract} /> } */}
    </div>
  );
}

export default Admin;
