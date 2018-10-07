import graphlib from '@dagrejs/graphlib'
import calculate from './calculate'

function makeGraph (links) {
  const graph = new graphlib.Graph()
  links.forEach(({ source, target }) => {
    graph.setEdge(source.toLowerCase(), target.toLowerCase())
  })
  return graph
}

export default class Pistis {
  async get (from, to) {
    if (!this.cachedLinks) {
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')
      myHeaders.append('Accept', 'application/json')

      var myInit = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({
          query: ' { links { source target } } '
        })
      };

      var myRequest = new Request('http://104.198.242.70/trustability/graphql')

      const res = await fetch(myRequest, myInit)
      const data = await res.json()
      this.cachedLinks = data.data.links
    }
    const graph = makeGraph(this.cachedLinks)

    return calculate(graph, from, to)
  }

  graph(links) {
    const graph = makeGraph(links)
    return graphlib.json.write(graph)
  }
}
