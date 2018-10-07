import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Graph from 'react-graph-vis'
import Trustability from '../../../trustability.js/index'

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
  visGraph(graph) {
    const nodes = graph.nodes.map(node => {
      const id = node.v
      return {
        id,
        label: id.substring(0, 10),
        borderWidth: 0
      }
    })
    const edges = graph.edges.map(edge => {
      return {
        id: `${edge.v}-${edge.w}`,
        from: edge.v,
        to: edge.w
      }
    })
    return { nodes, edges }
  }

  render() {
    const { classes, links } = this.props;
    const trustability = new Trustability()
    const graph = trustability.graph(links)
    const visGraph = this.visGraph(graph)

    return (
      <Graph graph={visGraph} options={visOptions}/>
    );
  }
}

export default withStyles(styles)(TrustManagement);
