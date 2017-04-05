
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const selectedStyle = {
  fontWeight: 'bold',
  color: 'red'
};

const tVar = {
  item: 'bob'
};

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

          <Navbar>
            <Nav>

              <NavItem eventKey={1}>
                <NavLink exact to="/about" activeStyle={selectedStyle}>About</NavLink>
              </NavItem>

              <NavItem eventKey={2}>
                <NavLink exact to="/about2" activeStyle={selectedStyle}>About2</NavLink>
              </NavItem>

            
              <NavItem eventKey={3}>
                <NavLink to={`/test/${tVar.item}`}>Test</NavLink>
              </NavItem>
            

              <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Action</MenuItem>
                <MenuItem eventKey={3.2}>Another action</MenuItem>
                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.4}>Separated link</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar>


           <Route path="/about" component={Test}/>
           <Route path="/about2" component={Test}/>
           <Route path="/test/:testText" component={TestParam}/>
        </div>
      </Router>
    );
  }
}



export default App;
