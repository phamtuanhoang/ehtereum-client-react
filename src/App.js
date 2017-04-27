import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3'
import _ from 'lodash'

var ether_client = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
var contractABI = [{"constant":true,"inputs":[],"name":"getPeople","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_firstName","type":"bytes32"},{"name":"_lastName","type":"bytes32"},{"name":"_age","type":"uint256"}],"name":"addPerson","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"people","outputs":[{"name":"firstName","type":"bytes32"},{"name":"lastName","type":"bytes32"},{"name":"age","type":"uint256"}],"payable":false,"type":"function"}];
var contractAdd = "0x54afd672f45efde9e7b36eb289a0f97e8f1b345f";
var peopleContract = ether_client.eth.contract(contractABI).at(contractAdd);


class App extends Component {
  constructor(props){
    super(props)
        this.state = {
            firstNames:[],
            lastNames:[],
            ages:[]
        }
  }


  componentWillMount(){
    console.log(peopleContract.getPeople());
    peopleContract.getPeople();
    var data = peopleContract.getPeople();
    this.setState({
      firstNames: String(data[0]).split(','),
      lastNames: String(data[1]).split(','),
      ages: String(data[2]).split(',')
    })
  }

  render() {
    var TableRows = []

    _.each(this.state.firstNames, (value, index) =>{
      TableRows.push(
        <tr>
          <td>{ether_client.toAscii(this.state.firstNames[index])}</td>
          <td>{ether_client.toAscii(this.state.lastNames[index])}</td>
          <td>{this.state.ages[index]}</td>
        </tr>
      )
    })

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Ethereum front-end</h2>
        </div>
        <div className="App-Content">
          <pre>{this.state.firstNames}</pre>
          <pre>{this.state.lastNames}</pre>
          <pre>{this.state.ages}</pre>
        </div>
        <table>
          <thead>
            <tr>
              <th>First Name </th>
              <th>Last Name </th>
              <th>Age </th>
            </tr>
          </thead>
          <tbody>
            <tr> </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
