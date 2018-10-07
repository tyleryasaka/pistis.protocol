truffleSetup = {
  migrations_directory: './migrations',
  networks: {
    development: {
      host: 'localhos',
      port: 8545,
      network_id: '*' // Match any network id
    },
  },
}

module.exports = truffleSetup
