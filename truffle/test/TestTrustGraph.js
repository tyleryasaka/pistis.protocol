const TrustGraph = artifacts.require('../contracts/TrustGraph.sol')

contract('TrustGraph', async (accounts) => {
  let source = accounts[0]
  let target = accounts[1]
  let other = accounts[2]

  let instance = null

  before('setup contract for test', async () => {
    instance = await TrustGraph.new()
  })

  it('...contract should add link between source and target.', async () => {
    await instance.addLink(target, { from: source })
    let isLink = await instance.isLinked.call(source, target)
    assert.equal(true, isLink, 'The link between source and target was not added')
  })

  it('...contract should remove link between source and target.', async () => {
    await instance.removeLink(target, { from: source })
    let isLink = await instance.isLinked.call(source, target)
    assert.equal(false, isLink, 'The link between source and target was not removed')
  })

})