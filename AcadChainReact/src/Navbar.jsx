import React, { useEffect } from "react";

function Navbar({account}) {
  useEffect(() => {
    console.log('account updated:', account);
  }, [account]);
  return (
    <nav className="bg-red-700">
        Current Account: {account}
    </nav>
  );
}

export default Navbar;
