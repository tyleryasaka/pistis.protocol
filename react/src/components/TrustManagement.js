
import _ from 'lodash'
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  textField: {
    width: '400px'
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
    const { accounts, links } = this.props
    const myLinks = links.filter(link => {
      return link.source.toLowerCase() === accounts[0].toLowerCase()
    })
    return _.map(myLinks, link => {
      return (
        <Grid item key={`${link.source}${link.target}`}>
          {link.target}
          <Button
            onClick={() => { this.onRemoveClick(link.target) }}
          >
            Remove
          </Button>
        </Grid>
      )
    })
  }

  render () {
    const { classes } = this.props
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            placeholder='Who do you trust?'
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
