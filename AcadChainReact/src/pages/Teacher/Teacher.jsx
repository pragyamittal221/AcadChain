import React from "react";
import GetTeacher from "./Get-Teacher";
import GetPassword from "./Get-Password";
import GetReviews from "./Get-Review";
import IPFSRetriever from "../Student/IPFSRetriever";

function Teacher() {
  return (
    <div className="bg-gray-100 pb-14 pt-16">
      <GetTeacher />
      <GetPassword />
      <GetReviews />
      <IPFSRetriever />
    </div>
  );
}

export default Teacher;
