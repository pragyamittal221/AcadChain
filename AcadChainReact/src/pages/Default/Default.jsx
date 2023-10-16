import React from "react";
import backgroundSvg from "../../assets/blobanimation.svg";
import AuthButtons from "./AuthButtons";

function Default({ handleConnectWallet }) {
  return (
    <div
      style={{ backgroundImage: `url(${backgroundSvg})` }}
      className="min-h-screen w-screen flex items-center justify-center bg-center bg-no-repeat"
    >
      <div className="bg-white rounded-lg shadow-md opacity-100 flex justify-center h-1/2">
        <div className="p-4 pr-0 m-4 -mr-20 ">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="w-9/12"
            alt="Sample image"
          />
        </div>
        <AuthButtons handleConnectWallet={handleConnectWallet} />
      </div>
    </div>
  );
}

export default Default;
