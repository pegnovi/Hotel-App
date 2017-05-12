

import { BrowserRouter as Router, Route } from 'react-router-dom';

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CustomNavigationBar from './CustomNavigationBar';
import ShopContainer from './ShopContainer';
import ServiceInstance from './ServiceInstance';

import ShopServiceVisual from './ShopServiceVisual';

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

class TestColumnComponent extends Component {
  render() {
    return (
      <div>
        {this.props.accessor}
      </div>
    );
  }
}

import ReactTable from 'react-table';
import 'react-table/react-table.css'

const myOrderList = [
  {
    instanceId: 'abcd', // when order (combine instance list with product list)
    serviceId: 'mr1',
    picture: require('./images/massage.png'),
    name: 'Massage',
    description: 'A very rough massage',
    price: 26
  },
  {
    instanceId: 'efgh', // when order (combine instance list with product list)
    serviceId: 'bib1',
    picture: require('./images/breakfastInBed.png'),
    name: 'Breakfast in Bed',
    description: 'You can choose from a menu',
    price: 41
  }
];

class ProductTable extends Component {
  render() {

    const columns = [
      {
        header: 'Picture',
        accessor: 'picture',
        render: props => <ShopServiceVisual pictureBlob={props.value}/>
      },
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

    // TODO: Make it add a component instead
    // TODO: Pass component props
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

    const headerList = this.props.headerList;
    const accessorList = this.props.accessorList;
    const columnComponentList = this.props.columnComponentList;
    if(columnComponentList) {
      columns.push({
        header: headerList[0],
        accessor: accessorList[0],
        render: props => {
          let TempComponent = columnComponentList[0];
          return <div>
            <TempComponent accessor={accessorList[0]} />
          </div>
        }
      });
    }

    // TODO: this.props.otherColumns
    // TODO: this.props.otherColumnComponents
    // ^^ For more customization (Shop will need this)

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
          {/* <Route path="/shop/" component={ShopContainer}/> */}
          <Route path="/shop/" render={() => <ProductTable
              tableType={'shop'}
              data={myOrderList}
              buttonAccessor={'serviceId'}
              buttonText={'Add to Cart'}
              buttonHandler={() => { console.log('TODO: Add to Cart'); }}

              headerList={['Test']}
              accessorList={['serviceId']}
              columnComponentList={[TestColumnComponent]}
            />
          } />
          <Route path="/serviceInstance/:serviceId" component={ServiceInstance}/>
          <Route path="/cart/" render={() => <ProductTable
              tableType={'cart'}
              data={myOrderList}
              buttonAccessor={'instanceId'}
              buttonText={'Remove'}
              buttonHandler={() => { console.log('TODO: Remove from Cart'); }}
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
