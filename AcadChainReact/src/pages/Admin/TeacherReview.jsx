import React, { useState, useEffect } from "react";

function TeacherReview({contract}) {
  const [reviews, setReviews] = useState([]);
  const [toRemove, setToRemove] = useState([]);
  const [teacherRegistrationData, setTeacherRegistrationData] = useState([]);

  useEffect(() => {
    const fetchTeacherRegistrationData = async () => {
      const data = await contract.methods.getTeacherRegistrationData().call();
      console.log("teacherRegstrationData from Admin.jsx", data); 
      setTeacherRegistrationData(data);
    };

    fetchTeacherRegistrationData();
  }, []);

  const handleReview = async (teacher, subject, decision) => {
    const newReview = {
      teacherCode: teacher.teacherCode,
      subjectCodes: subject.subjectCodes,
      studentCounts: subject.studentCounts,
      decision,
    };
 
    setReviews((prevReviews) => [...prevReviews, newReview]);

    if (decision === "Approve") {
    try {
      // Get the user's account address
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const adminAddress = accounts[0];

      const isOwner = await contract.methods.isOwner().call({ from: adminAddress });

      if (!isOwner) {
        alert('Only the owner can add a teacher.');
        return;
      }

      // Call the addTeacher function in TeacherRole contract
      await contract.methods.addTeacher(teacherRegistrationData.userAddress).send({ from: adminAddress });

      // Split subjectCodes and studentCounts by comma
      const subjectCodes = teacherRegistrationData.subjectCodes.split(",");
      const studentCounts = teacherRegistrationData.studentCounts.split(",").map(Number);

      // Call the addTeacher function in AcadChainContract
      await contract.methods.addTeacher(
        teacherRegistrationData.teacherCode,
        subjectCodes,
        studentCounts
      ).send({ from: adminAddress });

      alert('Teacher added successfully!');
    } catch (error) {
      console.error('An error occurred:', error);
      alert('Failed to add teacher. Please try again.');
    }
  }

  if (decision === "Approve" || decision === "Reject") {
    try {
        // Get the user's account address
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const adminAddress = accounts[0];

        // Call the deleteTeacherRegistrationData function in your contract
        await contract.methods.deleteTeacherRegistrationData(teacher.teacherCode).send({ from: adminAddress });

        alert('Teacher data deleted successfully!');
    } catch (error) {
        console.error('An error occurred:', error);
        alert('Failed to delete teacher data. Please try again.');
    }
}

    // Set a timer to remove the review data after 3 seconds
    setTimeout(() => {
      setToRemove((prev) => [...prev, newReview]);
    }, 3000);
  };

  // Log reviews to the console
  useEffect(() => {
    console.log(reviews);
  }, [reviews]);

  return (
    <div className="p-4 space-y-4">
      {teacherRegistrationData.map((teacher) => {
        if (toRemove.some((r) => r.teacherCode === teacher.teacherCode)) {
          return null; // Don't render this teacher's data if marked for removal
        }
        return (
          <div key={teacher.teacherCode} className="border-b-2 pb-2">
            <h2 className="text-xl font-semibold mb-2">
              {teacher.teacherCode}
            </h2>
            {teacher.subjects.map((subject) => {
              const reviewExists = reviews.find(
                (r) =>
                  r.teacherCode === teacher.teacherCode &&
                  r.subjectCodes === <subject className="subjectCodes"></subject>
              );
              const decision = reviewExists?.decision;

              return (
                <div
                  key={subject.subjectCodes}
                  className="flex items-center space-x-4 mb-2"
                >
                  <span>
                    {subject.subjectCodes} - {subject.studentCounts}
                  </span>
                  <button
                    disabled={!!decision}
                    onClick={() => handleReview(teacher, subject, "Approve")}
                    className={`px-2 py-1 rounded ${
                      decision ? "bg-gray-300" : "bg-green-500 text-white"
                    } focus:outline-none`}
                  >
                    Approve
                  </button>
                  <button
                    disabled={!!decision}
                    onClick={() => handleReview(teacher, subject, "Reject")}
                    className={`px-2 py-1 rounded ${
                      decision ? "bg-gray-300" : "bg-red-500 text-white"
                    } focus:outline-none`}
                  >
                    Reject
                  </button>
                  {decision && (
                    <span className="ml-4 font-medium">{decision}</span>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default TeacherReview;
