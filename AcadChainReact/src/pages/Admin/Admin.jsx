import React, { useState, useEffect } from "react";
import data from "./PendingTeacher";
import TeacherReview from "./TeacherReview";
import PdfUploadForm from "./PdfUploadForm";
import Teacher from "./../Teacher/Teacher";

function Admin({contract, teacherRegistrationData}) {
  
  useEffect(() => {
    console.log("teacherRegstrationData from Admin.jsx", teacherRegistrationData); 
  }, [teacherRegistrationData]);

  return (
    <div className="">
      Admin
      <Teacher />
      <PdfUploadForm />
      {/* <TeacherReview contract={contract} teacherRegistrationData={teacherRegistrationData} /> */}
    </div>
  );
}

export default Admin;
