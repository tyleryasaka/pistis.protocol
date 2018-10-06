import graphlib from '@dagrejs/graphlib'
import calculate from './calculate'

function makeGraph(links) {
  const graph = new graphlib.Graph()
  links.forEach(({ source, target }) => {
    graph.setEdge(source, target)
  })
  return graph
}

export default class Trustability {
  async get(from, to, callback) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');

    var myInit = {
      method: 'POST',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify({
        query: ' { links { source target } } '
      })
    };

    var myRequest = new Request('http://104.198.242.70/trustability/graphql');

    fetch(myRequest, myInit)
    .then(r => r.json())
    .then((data) => {
      const graph = makeGraph(data.data.links)
      const result = calculate(graph, from, to)
      callback(result)
    });
  }
}
