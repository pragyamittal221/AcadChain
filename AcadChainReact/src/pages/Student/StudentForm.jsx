import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import EvaluationForm from "./EvaluationForm";

function StudentForm({ contract }) {
  const [formData, setFormData] = useState({
    password: "",
    teacherCode: "",
    subjectCode: "",
    comment: "",
    ratings: {
      row1: { text: "Communication of subject matter", rating: "" },
      row2: { text: "Level of participation and engagement with subject", rating: "" },
      row3: { text: "Organization and logical flow of material", rating: "" },
      row4: { text: "Willingness to learn from students", rating: "" },
      row5: { text: "Quality and creativity of assignments", rating: "" },
    },
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRatingChange = (rowKey, value) => {
    setFormData((prevData) => ({
      ...prevData,
      ratings: {
        ...prevData.ratings,
        [rowKey]: { ...prevData.ratings[rowKey], rating: value },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allFieldsFilled = Object.values(formData).every((field) => field !== null && field !== "");
    if (!allFieldsFilled) {
      alert("Please fill all fields before submitting.");
      return;
    }
    console.log("Form Data:", formData);
    setIsSubmitted(true);
    const ratings = Object.values(formData.ratings).map(ratingData => ratingData.rating);
    if (contract) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const selectedAccount = accounts[0];
      await contract.methods.addReview(
        formData.teacherCode,
        formData.subjectCode,
        ratings,
        formData.comment,
        parseInt(formData.password)
        ).send({ from: selectedAccount })
        .then((receipt) => {
          console.log("here4");
          console.log('Transaction successful!', receipt);
          alert('Review added successfully!');
        })
        .catch((error) => {
          console.log("here5");
          console.error('An error occurred:', error);
          alert('Failed to add review. Please try again.');
    });
  }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-12 ">
      <Card color="white" className="w-full max-w-2xl mx-auto p-10 bg-white rounded-xl shadow-md items-center" >
        <Typography variant="h4" color="black" className="text-center">
          Add Review
        </Typography>
        <Typography color="gray" className="mt-1 font-normal"></Typography>
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 flex justify-center"
        >
          <div className="mb-4 flex flex-col gap-6 items-center">
            <Input
              size="lg"
              label="Password"
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
            <Input
              size="lg"
              label="Teacher Code"
              onChange={(e) => handleInputChange("teacherCode", e.target.value)}
            />
            <Input
              size="lg"
              label="Subject Code"
              onChange={(e) => handleInputChange("subjectCode", e.target.value)}
            />
            <EvaluationForm
              formData={formData.ratings}
              handleRatingChange={handleRatingChange}
            />
            <div className="w-full">
              <Textarea
                label="Comments"
                onChange={(e) => handleInputChange("comment", e.target.value)}
              />
            </div>
              <Button className="mt-6 w-48 bg-blue-900  hover:bg-gray-700" type="submit" disabled={isSubmitted}>
                Submit
              </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default StudentForm;
