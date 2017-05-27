
import { BrowserRouter as Router, Route } from 'react-router-dom';

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CustomNavigationBar from './CustomNavigationBar';

import { ServiceInstanceContainer } from './ServiceInstance';

import ProductTable from './ProductTable';
import { CartContainer } from './Cart';
import { ShopContainer } from './Shop';

import Rooms from './Rooms';

import reducer from './reducer';
import remoteActionMiddleware from './remote_action_middleware';
import { getServices, getServiceInstances } from './action_creators';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import 'whatwg-fetch'; //fetch


const TestParam = ({match}) => {
	return (
		<div>
			{match.params.testText}
		</div>
	);
}



// TODO: Query for this later
const myOrderList = [
	{
		instanceId: 'abcd', // when order (combine instance list with product list)
		serviceId: 'mr1',
		pictureKey: 'massage',
		name: 'Massage',
		description: 'A very rough massage',
		price: 26
	},
	{
		instanceId: 'efgh', // when order (combine instance list with product list)
		serviceId: 'bib1',
		pictureKey: 'breakfastInBed',
		name: 'Breakfast in Bed',
		description: 'You can choose from a menu',
		price: 41
	}
];

// Passing props to Route components
// By tchaffee
// https://github.com/ReactTraining/react-router/issues/4105

// make reducers also take action functions (instead of just objects)
// http://danmaz74.me/2015/08/19/from-flux-to-redux-async-actions-the-easy-way/

// Middleware order in applyMiddleware is (1, 2, 3, ...)
// So thunk should be last
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(
	//remoteActionMiddleware,
	thunk)
(createStore);

const store = createStoreWithMiddleware(reducer);
store.dispatch(getServices());
store.dispatch(getServiceInstances());


class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			services: [],
			cart: []
		};
	}

	componentDidMount() {
		// fetch('/api/services')
		// .then((response) => {
		// 	return response.json();
		// })
		// .then((services) => {
		// 	this.setState({
		// 		services: services
		// 	})
		// })
		// .catch((error) => {
		// 	throw error;
		// });
	}

	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<div className="App-header">
							<img src={logo} className="App-logo" alt="logo" />
							<h2>Welcome to React</h2>
						</div>

						<CustomNavigationBar/>


						<Route path="/rooms" render={() => <Rooms roomIds={[1,2,3]}/>} />

						<Route path="/test/:testText" component={TestParam}/>
						<Route path="/shop/" component={ShopContainer}/>
						<Route path="/serviceInstance/:id" component={ServiceInstanceContainer}/>
						<Route path="/cart/" component={CartContainer}/>
						<Route path="/orders/" render={() => <ProductTable
								tableHeader={'Orders'}
								tableType={'orders'}
								data={myOrderList}
							/>
						} />
					</div>
				</Router>
			</Provider>
		);
	}
}



export default App;
