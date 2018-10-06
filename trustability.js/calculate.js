import _ from 'underscore'

// TODO make configurable
const discount = 0.5
const gradient = 1

function calculate(graph, source, target, visited = [], currentDiscount = discount) {
  if (source === target) {
    return 1
  }
  if (_.includes(visited, source)) {
    return 0
  }
  let newVisited = visited.slice(0) // clone array
  newVisited.push(source)
  const successors = graph.successors(source)
  const doubts = successors.map((successor) => {
    const fromSuccessor = calculate(
      graph,
      successor,
      target,
      newVisited,
      currentDiscount * gradient
    )
    const toSuccessor = 1 - currentDiscount
    const throughSuccessor = toSuccessor * fromSuccessor
    return 1 - throughSuccessor
  })
  const totalDoubt = doubts.reduce((acc, cur) => acc * cur, 1)
  return 1 - totalDoubt
}

export default calculate
