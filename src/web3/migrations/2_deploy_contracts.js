const CryptoBricks = artifacts.require("./CryptoBricks.sol");

module.exports = function (deployer) {
  deployer.deploy(CryptoBricks, '0x6DA1C2adf7355b66F26FF5ecb7d84A5f37ff03A8');
};
