const schoolManager = artifacts.require("schoolManager");

module.exports = function (deployer) {
  deployer.deploy(schoolManager);
};