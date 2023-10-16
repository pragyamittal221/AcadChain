const AcadChainContract = artifacts.require("AcadChainContract");

module.exports = function (deployer) {
  deployer.deploy(AcadChainContract);
};
