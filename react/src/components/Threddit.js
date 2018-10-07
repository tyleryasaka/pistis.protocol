import _ from 'lodash'
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Identicon from 'identicon.js';
import Grid from '@material-ui/core/Grid';
import Upvote from 'react-upvote';
import Trustability from '../../../trustability.js/index'

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
})

const threads = [
  {
    id: '0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    votes: [
      {
        type: 'up',
        address: '0x0d1d4e623d10f9fba5db95830f7d3839406c6af2'
      },
      {
        type: 'up',
        address: '0x00a329c0648769a73afac7f9381e08fb43dbea72'
      }
    ]
  },
  {
    id: '0x821aea9a577a9b44299b9c15c88cf3087f3b5544',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    votes: [
      {
        type: 'up',
        address: '0x821aea9a577a9b44299b9c15c88cf3087f3b5544'
      },
      {
        type: 'up',
        address: '0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e'
      }
    ]
  },
  {
    id: '0x627306090abab3a6e1400e9345bc60c78a8bef57',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    votes: [
      {
        type: 'up',
        address: '0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5'
      },
      {
        type: 'up',
        address: '0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e'
      }
    ]
  }
]

class Thredit extends Component {
  componentDidMount () {
    // this.props.fetchThreads()
  }

  async renderCards () {
    const trustability = new Trustability();
    const { accounts } = this.props;
    let currentViewer = accounts ? accounts[0] : null;
    let scoreThreads = await Promise.all(_.map(threads, async thread => {
      let threadScore = 0;
      for (let vote in thread.votes) {
        let currTrust = await trustability.get(
          currentViewer,
          vote.address
        );
        if (vote.type === 'up') {
          threadScore += currTrust;
        } else {
          threadScore -= currTrust;
        }
      }
      thread['threadScore'] = threadScore;
      return thread;
    }));

    function compare(a, b) {
      let comparison = 0;
      if (a['threadScore'] > b['threadScore']) {
        comparison = 1;
      } else if(b['threadScore'] > a['threadScore']) {
        comparison = -1;
      }
      return comparison;
    }

    scoreThreads.sort(compare);

    return _.map(scoreThreads, thread => {
      var data = new Identicon(thread.id).toString();
      var avatarPic = "data:image/png;base64," + data;
      return (
        <Grid item xs={8} justify="center">
          <Card>
            <CardHeader
              avatar={
                <Avatar src={avatarPic}/>
              }
              title={thread.id}
              subheader="September 14th, 2018"
            />
            <CardContent>
              <Typography component="h2" variant="headline">
                {thread.text}
              </Typography>
              <Typography paragraph>
                Upvotes: {10}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )
    });
  }

  render () {
    return (
      <div>
        <h3>Threads</h3>
        <Grid container spacing={24} justify="center">
          {this.renderCards()}
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Thredit)
