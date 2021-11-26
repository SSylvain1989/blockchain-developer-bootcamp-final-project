const SchoolManager = artifacts.require("SchoolManager");

module.exports = function (deployer) {
  deployer.deploy(SchoolManager);
};
