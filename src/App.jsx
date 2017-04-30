

import { BrowserRouter as Router, Route } from 'react-router-dom';

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CustomNavigationBar from './CustomNavigationBar';
import ShopContainer from './ShopContainer';
import ServiceInstance from './ServiceInstance';

const Test = () => {
  return (
    <div>
      Test
    </div>
  );
}

const TestParam = ({match}) => {
  return (
    <div>
      {match.params.testText}
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>

          <CustomNavigationBar/>

          <Route path="/about" component={Test}/>
          <Route path="/about2" component={Test}/>
          <Route path="/test/:testText" component={TestParam}/>
          <Route path="/shop/" component={ShopContainer}/>
          <Route path="/serviceInstance/:serviceId" component={ServiceInstance}/>

        </div>
      </Router>
    );
  }
}



export default App;
