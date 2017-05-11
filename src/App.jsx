

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

import ReactTable from 'react-table';
import 'react-table/react-table.css'

const myOrderList = [
  {
    serviceId: 'mr1',
    name: 'Massage',
    description: 'A very rough massage',
    price: 26
  },
  {
    serviceId: 'bib1',
    name: 'Breakfast in Bed',
    description: 'You can choose from a menu',
    price: 41
  }
];

class ProductTable extends Component {
  render() {

    const columns = [
      {
        header: 'Service Name',
        accessor: 'name' // String-based value accessors!
      },
      {
        header: 'Description',
        accessor: 'description'
      },
      {
        header: 'Price',
        accessor: 'price',
        render: props => <span>{'$' + props.value}</span> // Custom cell components!
      }
    ];

    const tableType = this.props.tableType;
    let heading = '';

    if(tableType === 'cart') {
      heading = 'My Cart';
    }
    else if(tableType === 'orders') {
      heading = 'My Orders';
    }

    const buttonAccessor = this.props.buttonAccessor;
    const buttonText = this.props.buttonText;
    const buttonHandler = this.props.buttonHandler;
    if(buttonAccessor && buttonText && buttonHandler) {
      columns.push({
        header: 'Action',
        accessor: buttonAccessor,
        render: props => {
          return <div>
            <button onClick={buttonHandler}>
              {buttonText}
            </button>
          </div>
        }
      })
    }

    return (
      <div>
        <h1> {heading} </h1>

        <div>
          <ReactTable
            data={this.props.data}
            columns={columns}
            pageSize={1}
          />
        </div>
      </div>
    );
  }
}

// Passing props to Route components
// By tchaffee
// https://github.com/ReactTraining/react-router/issues/4105

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
          <Route path="/cart/" render={() => <ProductTable
              tableType={'cart'}
              data={myOrderList}
              buttonAccessor={'instanceId'}
              buttonText={'Remove'}
              buttonHandler={() => { console.log('hello'); }}
            />
          } />
          <Route path="/orders/" render={() => <ProductTable
              tableType={'orders'}
              data={myOrderList}
            />
          } />
        </div>
      </Router>
    );
  }
}



export default App;
