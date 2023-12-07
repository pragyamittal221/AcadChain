import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import MetamaskIcon from "../../assets/icons/metamask.png";

function AuthButtons({handleConnectWallet}) {

  return (
    <div className="flex flex-col items-center gap-4 p-4 -ml-10 mr-10 m-4 justify-center">
      <h2 className="mb-2 mt-1 pb-1 text-2xl font-semibold">
        Welcome to <span style={{ color: "#ea4247" }}>AcadChain</span>
      </h2>
      <Button
        size="lg"
        variant="outlined"
        color="blue-gray"
        className="flex items-center gap-3 m-5"
        onClick={handleConnectWallet}
      >
        <img src={MetamaskIcon} alt="metamask" className="h-6 w-6" />
        Connect to Wallet
      </Button>
      <div className="flex flex-col justify-center p-4 pt-0 -mt-4">
        <h3 className="mb-4 mt-2 pb-1 text-xl font-semibold text-center">
          I am a..
        </h3>
        <div className="">
          <Button ripple={true}  className="m-2 bg-blue-900 hover:bg-gray-700">
            <Link to="/student">Student</Link>
          </Button>
          <Button ripple={true} className="m-2 bg-blue-900 hover:bg-gray-700">
            <Link to="/teacher">Teacher</Link>
          </Button>
          <Button ripple={true} className="m-2 bg-blue-900 hover:bg-gray-700">
            <Link to="/admin">Admin</Link>
          </Button>
          <Button ripple={true} className="m-2 bg-blue-900 hover:bg-gray-700">
            <Link to="/teachernotapproved">Teacher not approved</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AuthButtons;
