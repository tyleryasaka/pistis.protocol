// Returns Promise (resolves array of link objects)
function getLinks () {
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

  const myRequest = new Request('http://104.198.242.70/trustability/graphql')

  return fetch(myRequest, myInit)
  .then(r => r.json())
  .then((data) => {
    return data.data.links
  })
}

export {
  getLinks
}
