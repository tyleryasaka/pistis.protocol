import React, { Component } from 'react';
import logo from '../public/logo.jpg';
import './App.css';
import PropTypes from 'prop-types';
import Web3 from 'web3';
import contract from 'truffle-contract';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import TrustManagement from './components/TrustManagement';
import Tab2 from './components/Tab2';
import Threddit from './components/Threddit';
import CircularProgress from '@material-ui/core/CircularProgress'
import purple from '@material-ui/core/colors/purple'

import TrustGraph from '../../truffle/build/contracts/TrustGraph.json'
import { getLinks } from './utils/trustGraph'

const CONTRACT_ADDRESS = '0xa3260d14aabffe747992f650b2bd5c3029da4b68'

async function getWeb3() {
  let web3 = window.web3
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider.
    console.log('Injected web3 detected.')
    return new Web3(web3.currentProvider)
  }
  console.error('web3 not found')
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
  logo: {
    width: '500px',
    maxWidth: '100%'
  }
});

class App extends Component {
  state = {
    value: 0,
    loading: true
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index })
  }

  async componentDidMount() {
    const web3 = await getWeb3()
    const accounts = await web3.eth.getAccounts()
    const trustGraph = await getDeployed(web3, CONTRACT_ADDRESS)
    const links = await getLinks()
    this.setState({ web3, accounts, trustGraph, links, loading: false})
  }

  render() {
    if (this.state.loading) {
      return (
        <CircularProgress style={{ color: purple[500] }} thickness={7} />
      )
    }
    const { classes, theme } = this.props;
    const { value, web3, accounts, trustGraph, links } = this.state
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
            <Tab label="My Graph" />
            <Tab label="Manage" />
            <Tab label="Threddit" />
          </Tabs>
        </AppBar>
        {value === 0 && (<Tab2 links={links} accounts={accounts} />)}
        {value === 1 && <TabContainer><TrustManagement web3={web3} accounts={accounts} links={links} trustGraph={trustGraph} /></TabContainer>}
        {value === 2 && <TabContainer><Threddit accounts={accounts} /></TabContainer>}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App)
