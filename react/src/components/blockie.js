import React from 'react'
import makeBlockie from 'ethereum-blockies-base64'

class Blockie extends React.Component {
  render () {
    return <img src={ makeBlockie(this.props.address) }/>
  }
}

export default Blockie
