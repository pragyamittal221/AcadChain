import React, { useState } from 'react';
import { create } from 'ipfs-http-client';
import { Input, Button, Typography } from "@material-tailwind/react";

const client = create('https://ipfs.infura.io:5001/api/v0');

function IPFSUploader() {
  const [file, setFile] = useState(null);

  const uploadFile = async () => {
    try {
      const added = await client.add(file);
      console.log('Uploaded file:', added.path);
    } catch (error) {
      console.error('Error uploading file: ', error);
    }  
  };

  return (
    <div className="flex flex-col gap-6 items-center bg-gray-100 ">
      <div color="white" className="w-full max-w-2xl p-16 bg-white rounded-xl shadow-md items-center ">
        <Typography variant="h4" color="blue-gray" className='flex justify-center'>
          Upload Report Card
        </Typography>
        <div className="flex justify-center mt-8">
          <Input
            type="file"
            size="lg"
            label="Select a file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="flex justify-center">
          <Button className="mt-8 w-48 bg-blue-900 hover:bg-gray-700" onClick={uploadFile}>
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
}

export default IPFSUploader;

// import React, { useState } from "react";

// function PdfUploadForm() {
//   const [rollNumber, setRollNumber] = useState("");

//   const handleRollNumberChange = (event) => {
//     setRollNumber(event.target.value);
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       console.log("Uploading file:", file.name);
//       // Here you can handle the file upload process, such as sending it to a server.
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle the form submission logic here.
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded shadow-md w-96"
//       >
//         <h2 className="text-2xl mb-4 font-bold">Upload PDF</h2>

//         <div className="mb-4">
//           <label
//             className="block text-sm font-medium mb-2"
//             htmlFor="roll-number"
//           >
//             Roll Number
//           </label>
//           <input
//             type="text"
//             id="roll-number"
//             value={rollNumber}
//             onChange={handleRollNumberChange}
//             placeholder="Enter your roll number"
//             className="p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="mb-4">
//           <label
//             className="block text-sm font-medium mb-2"
//             htmlFor="pdf-upload"
//           >
//             Upload PDF
//           </label>
//           <input
//             type="file"
//             id="pdf-upload"
//             accept=".pdf"
//             onChange={handleFileUpload}
//             className="p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default PdfUploadForm;
