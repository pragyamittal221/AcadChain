import React, { useState } from "react";

function PdfUploadForm() {
  const [rollNumber, setRollNumber] = useState("");

  const handleRollNumberChange = (event) => {
    setRollNumber(event.target.value);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Uploading file:", file.name);
      // Here you can handle the file upload process, such as sending it to a server.
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic here.
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl mb-4 font-bold">Upload PDF</h2>

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="roll-number"
          >
            Roll Number
          </label>
          <input
            type="text"
            id="roll-number"
            value={rollNumber}
            onChange={handleRollNumberChange}
            placeholder="Enter your roll number"
            className="p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="pdf-upload"
          >
            Upload PDF
          </label>
          <input
            type="file"
            id="pdf-upload"
            accept=".pdf"
            onChange={handleFileUpload}
            className="p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default PdfUploadForm;
