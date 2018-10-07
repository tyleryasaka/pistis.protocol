import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Graph from 'react-graph-vis'
import Pistis from '../../../pistis.js/index'
import Identicon from 'identicon.js';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const visOptions = {
  edges: {
    smooth: {
      enabled: true
    },
    chosen: {
      edge: (values => {
        values.opacity = 0.9
      })
    },
    color: {
      opacity: 0.25
    },
    width: 3
  }
}

class TrustManagement extends Component {
  constructor() {
    super()
    this.state = {}
  }

  async componentDidMount() {
    const { links, accounts } = this.props;
    const trustability = new Pistis()
    const graph = trustability.graph(links)
    const trustabilitiesArr = await Promise.all(graph.nodes.map(async node => {
      const target = node.v
      const trustabilityScore = await trustability.get(accounts[0], target)
      return {
        trustabilityScore,
        target
      }
    }))
    const trustabilities = trustabilitiesArr.reduce((acc, cur) => {
      const clone = Object.assign({}, acc)
      clone[cur.target] = cur.trustabilityScore
      return clone
    }, {})
    this.setState({ graph, trustabilities })
  }

  visGraph(graph, trustabilities) {
    const nodes = graph.nodes.map(node => {
      const id = node.v;
      const trustabilityScore = Math.round(trustabilities[id] * 100) / 100
      const label = String(trustabilityScore);
      const data = new Identicon(id).toString();
      const image = "data:image/png;base64," + data;
      let fontColor
      if (trustabilityScore >= 0.75) {
        fontColor = '#1fa33b'
      } else if (trustabilityScore >= 0.25) {
        fontColor = '#f7aa2e'
      } else {
        fontColor = '#c60000'
      }
      return {
        id,
        image,
        label,
        shape: 'circularImage',
        color: '#aaa',
        font: `20 Roboto ${fontColor}`,
        borderWidth: 0
      };
    })
    const edges = graph.edges.map(edge => {
      return {
        id: `${edge.v}-${edge.w}`,
        from: edge.v,
        to: edge.w
      };
    });
    return { nodes, edges };
  }

  render() {
    const { classes } = this.props;
    const { graph, trustabilities } = this.state;
    if (graph && trustabilities) {
      const visGraph = this.visGraph(graph, trustabilities);

      return (
        <Graph graph={visGraph} options={visOptions}/>
      );
    } else {
      return null
    }
  }
}

export default withStyles(styles)(TrustManagement);
