module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "5777", // Match any network id
      gas: 3000000
    }
  },
  //contracts_build_directory: "./dist/contracts", // disabled until fix for https://github.com/trufflesuite/truffle-migrate/issues/10
  test_directory: "./test/contract"
};
