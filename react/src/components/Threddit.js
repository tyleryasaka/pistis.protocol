import _ from 'lodash'
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Identicon from 'identicon.js';
import Grid from '@material-ui/core/Grid';
import Upvote from 'react-upvote';
import Pistis from '../../../pistis.js/index'

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  icon: {
    margin: theme.spacing.unit * 2,
    marginBottom: '-5px',
  },
})

const threads = [
  {
    id: '0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef',
    text: '"The journey of a thousand miles begins with one step."',
    author: "Lao Tzu",
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
    text: '“Life is not measured by the number of breaths we take, but by the moments that take our breath away.”',
    author: "Maya Angelou",
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
    text: '"An infinite number of mathematicians walk into a bar. The first one orders a beer. The second one orders half a beer. The third one orders a fourth of a beer. The bartender stops them, pours two beers and says, "You guys should know your limits."﻿',
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
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount () {
    const trustability = new Pistis();
    const { accounts } = this.props;
    let currentViewer = accounts ? accounts[0] : null;
    let scoreThreads = await Promise.all(_.map(threads, async thread => {
      const resolved = await Promise.all(_.map(thread.votes, async vote => {
        let currTrust = await trustability.get(
          currentViewer,
          vote.address
        );
        return {
          type: vote.type,
          trust: currTrust
        }
      }))
      const reduced = resolved.reduce((acc, { type, trust }) => {
        if (type === 'up') {
          return acc + trust
        } else {
          return acc - trust
        }
      }, 0);
      thread['threadScore'] = Math.round(reduced * 100);
      return thread;
    }));

    scoreThreads.sort((a, b) => {
      let comparison = 0;
      if (a['threadScore'] > b['threadScore']) {
        comparison = -1;
      } else if(b['threadScore'] > a['threadScore']) {
        comparison = 1;
      }
      return comparison;
    });

    this.setState({ scoreThreads });
  }

  renderCards (classes) {
    const { scoreThreads } = this.state;

    return scoreThreads && _.map(scoreThreads, thread => {
      var data = new Identicon(thread.id).toString();
      var avatarPic = "data:image/png;base64," + data;
      return (
        <Grid item xs={8} justify="center" key={thread.id}>
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar src={avatarPic} className={classes.avatar} />
              }
            />
            <CardContent>
              <Typography component="p" variant="headline">
                {thread.text}{thread.author && ` - ${thread.author}`}
              </Typography>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>

              <Typography component="p" variant="headline">
                <Icon color="disabled" fontSize="large" className={classes.icon}>
                  thumb_up
                </Icon>
                {thread.threadScore}
              </Typography>
            </CardActions>
          </Card>
        </Grid>
      )
    });
  }

  render () {
    const { classes, theme } = this.props;
    return (
      <div>
        <h3>Threds</h3>
        <Grid container spacing={24} justify="center">
          {this.renderCards(classes)}
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Thredit)
