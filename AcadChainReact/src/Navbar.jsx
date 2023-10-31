import React, { useEffect } from "react";

function Navbar({account, contract}) {
  useEffect(() => {
    console.log('account updated:', account);
  }, [account]);
  return (
    <nav className="bg-red-700">
        Current Account: {account} <br />
        Contract Address: {contract ? contract.options.address : 'Not connected'}
    </nav>
  );
}

export default Navbar;
