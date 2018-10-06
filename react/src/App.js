import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
import Web3 from 'web3';
import contract from 'truffle-contract';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import TrustManagement from './TrustManagement';
import Tab2 from './Tab2';
import Threddit from './Threddit';

import TrustGraph from '../../truffle/build/contracts/TrustGraph.json'
import { getLinks } from './utils/trustGraph'
import Trustability from '../../trustability.js/index'

async function getWeb3() {
  let web3 = window.web3

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider.
    console.log('Injected web3 detected.');
    return new Web3(web3.currentProvider)
  }
}

async function getDeployed(web3, address) {
  if (web3) {
    const trustGraph = contract(TrustGraph)
    trustGraph.setProvider(web3.currentProvider)
    const deployed = address
      ? trustGraph.at(address)
      : trustGraph.deployed()
    return deployed
  }
}

function TabContainer({ children }) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class App extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  async componentDidMount() {
    const web3 = await getWeb3()
    const accounts = await web3.eth.getAccounts()
    const trustGraph = await getDeployed()
    const links = await getLinks()
    console.log('links', links)

    const trustability = new Trustability()
    const trustabilityScore = await trustability.get(
      '0x627306090abab3a6e1400e9345bc60c78a8bef57',
      '0x8e0f9edb52f762fc93a154953b67d3f7926ab1f6'
    )
    console.log('trustability', trustabilityScore)

    this.setState({ web3, accounts, trustGraph, links, trustabilityScore })

    // to add a link:
    // trustGraph.addLink('0xf17f52151ebef6c7334fad080c5704d77216b732', { from: accounts[0] })

    // to remove a link:
    // trustGraph.removeLink('0xf17f52151ebef6c7334fad080c5704d77216b732', { from: accounts[0] })
  }

  render() {
    const { classes, theme } = this.props;
    const { value, web3, accounts, trustGraph, links } = this.state;

    return (
      <div className="App">
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="My Trust" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><TrustManagement web3={web3} /></TabContainer>}
        {value === 1 && <TabContainer><Tab2 /></TabContainer>}
        {value === 2 && <TabContainer><Threddit /></TabContainer>}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
