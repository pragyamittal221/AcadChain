import React, { useState } from 'react';
import { create } from 'ipfs-http-client';
import { Input, Button, Typography } from "@material-tailwind/react";

const client = create('https://ipfs.infura.io:5001/api/v0');

function IPFSRetriever() {
  const [ipfsHash, setIpfsHash] = useState('');

  const downloadFile = async () => {
    try {
      const file = await client.get(ipfsHash);
      console.log(file);
    } catch (error) {
      console.error('Error downloading file: ', error);
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center bg-gray-100 pt-12">
      <div color="white" className="w-full max-w-2xl p-16 bg-white rounded-xl shadow-md items-center ">
      <Typography variant="h4" color="blue-gray" className='flex justify-center'>
        Get Report Card
      </Typography>
        <div className="flex justify-center mt-8">
        <Input
          size="lg"
          label="Enter IPFS hash"
          onChange={(e) => setIpfsHash(e.target.value)}
        />
        </div>
        <div className="flex justify-center">
          <Button className="mt-8 w-48 bg-blue-900 hover:bg-gray-700" onClick={downloadFile} >
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}

export default IPFSRetriever;
