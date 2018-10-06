const TrustGraph = artifacts.require('./TrustGraph.sol')

module.exports = function(deployer) {
  return deployer.then(() => {
    return deployContracts(deployer)
  })
}

async function deployContracts(deployer) {
  await deployer.deploy(TrustGraph)
}
