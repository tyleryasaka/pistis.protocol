
import _ from 'lodash'
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
})

class TrustManagement extends Component {

  constructor () {
    super()
    this.state = {
    }
  }

  async addEntity () {
    if (this.state.input) {
      const { accounts, trustGraph } = this.props
      let isLink = await trustGraph.isLinked(accounts[0], this.state.input)
      if (!isLink) {
        trustGraph.addLink(this.state.input, { from: accounts[0] })
      }
    }
  }

  async onRemoveClick (target) {
    const { accounts, trustGraph } = this.props
    let isLink = await trustGraph.isLinked(accounts[0], target)
    if (isLink) {
      trustGraph.removeLink(target, { from: accounts[0] })
    }
  }

  updateInput (event) {
    this.setState({ input: event.target.value })
  }

  renderConections () {
    return _.map(this.props.links, entity => {
      return (
        <Grid item key={`${entity.source}${entity.target}`}>
          {entity.target}
          <Button
            onClick={() => { this.onRemoveClick(entity.target) }}
          >
            Remove
          </Button>
        </Grid>
      )
    })
  }

  render () {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Input
            placeholder='Add new entity you trust'
            onChange={this.updateInput.bind(this)}
          />
          <Button
            className='btn pull-xs-right'
            onClick={this.addEntity.bind(this)}
          >
              Add
          </Button>
          <Grid item xs={12} >
            {this.renderConections()}
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(TrustManagement)
