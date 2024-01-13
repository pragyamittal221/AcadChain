import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useContract, useUserAddress } from "../../connectContract";

function GetReviews() {
  const [teacherCode, setTeacherCode] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [reviews, setReviews] = useState(null);

  const contract = useContract();
  const userAddress = useUserAddress();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teacherCode || !subjectCode) {
      alert("Please enter both the teacher code and subject code before submitting.");
      return;
    }

    try {
      // Call the getReview function from the smart contract
      const reviewData = await contract.methods.getReview(teacherCode, subjectCode).call({from: userAddress});
      setReviews(reviewData);
      console.log("Review Data:", reviewData);
    } catch (error) {
      console.error("Error fetching review data:", error);
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 pt-12">
      <Card color="white" className="w-full max-w-2xl mx-auto p-10 bg-white rounded-xl shadow-md items-center">
        <Typography variant="h4" color="blue-gray">
          Get Reviews
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit} style={{width:'491px'}}>
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Teacher Code"
              value={teacherCode}
              onChange={(e) => setTeacherCode(e.target.value)}
            />
            <Input
              size="lg"
              label="Subject Code"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <Button type="submit" className="mt-4 w-48 bg-blue-900 hover:bg-gray-700">
              Get Reviews
            </Button>
          </div>
        </form>
        {reviews && (
          <div className="mt-4">
            {reviews.map((review, index) => (
              <div key={index}>
                <Typography variant="h6" color="blue-gray">
                  Review {index + 1}:
                </Typography>
                <Typography color="gray">
                  Communication of subject matter: {review.ratings[0]}
                </Typography>
                <Typography color="gray">
                  Level of participation and engagement with subject: {review.ratings[1]}
                </Typography>
                <Typography color="gray">
                  Organization and logical flow of material: {review.ratings[2]}
                </Typography>
                <Typography color="gray">
                  Willingness to learn from students: {review.ratings[3]}
                </Typography>
                <Typography color="gray">
                  Quality and creativity of assignments: {review.ratings[4]}
                </Typography>
                <Typography color="gray">
                  Comments: {review.comments}
                </Typography>
                <br/>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export default GetReviews;
