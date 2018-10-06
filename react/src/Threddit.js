import _ from 'lodash'
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
})

const threads = [
  {
    id: '0x...',
    comments: [],
    votes: [
      {
        type: 'up',
        address: '0x...'
      }
    ]
  }
]

class Thredit extends Component {
  componentDidMount () {
    // this.props.fetchThreads()
  }

  renderCards () {
    return _.map(threads, thread => {
      return (
        <li className='list-group-item' key={thread.id}>
          <Card>
            <div>
              <CardContent>
                <Typography component="h2" variant="headline">
                  Live From Space
                </Typography>
                <Typography variant="subheading" color="textSecondary">
                  Mac Miller
                </Typography>
              </CardContent>
            </div>
            <CardMedia
              image="http://r.ddmcdn.com/w_606/s_f/o_1/cx_0/cy_15/cw_606/ch_404/APL/uploads/2014/06/10-kitten-cuteness-1.jpg"
              height="200"
              title="Live from space album cover"
            />
          </Card>
        </li>
      )
    })
  }

  render () {
    return (
      <div>
        <h3>Threads</h3>
        <ul className='list-group'>
          {this.renderCards()}
        </ul>
      </div>
    )
  }
}

export default withStyles(styles)(Thredit)
