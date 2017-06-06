
import { BrowserRouter as Router, Route } from 'react-router-dom';

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CustomNavigationBar from './components/CustomNavigationBar';
import ProductTable from './components/ProductTable';
import { CartContainer } from './components/Cart';
import { CheckoutContainer } from './components/Checkout';
import { ShopContainer } from './components/Shop';
import { ServiceInstanceContainer } from './components/ServiceInstance';

import Rooms from './components/Rooms';

import serviceInstanceReducer from './reducers/service_instance_reducer';
import serviceReducer from './reducers/service_reducer';
import regularReducer from './reducers/regular_reducer';
import reducer from './reducers/reducer';

//import remoteActionMiddleware from './remote_action_middleware';
import { setState } from './actions/regular_actions';
import { getServices } from './actions/service_actions';
import { getServiceInstances } from './actions/service_instance_actions';

import { combineReducers } from 'redux-immutable';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { fromJS } from 'immutable';

const TestParam = ({match}) => {
	return (
		<div>
			{match.params.testText}
		</div>
	);
}



// TODO: Query for this later
const myOrderList = fromJS({
	services: [
		{
			id: 'mr1',
			pictureKey: 'massage',
			name: 'Massage',
			description: 'A very rough massage',
			price: 26
		},
		{
			id: 'bib1',
			pictureKey: 'breakfastInBed',
			name: 'Breakfast in Bed',
			description: 'You can choose from a menu',
			price: 41
		}
	],
	serviceInstances: [
		{
			id: 'abcd', // when order (combine instance list with product list)
			serviceId: 'mr1',
			purchased: false
		},
		{
			id: 'efgh', // when order (combine instance list with product list)
			serviceId: 'bib1',
			purchased: true
		}
	]
});

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

const initialState = fromJS({
	services: [],
	serviceInstances: []
});
// https://bumbu.github.io/redux-combinereducers-for-immutable-js/
const rootReducer = combineReducers({
		serviceInstances: serviceInstanceReducer,
		services: serviceReducer,
		regularReducer
	}
);
// https://github.com/gajus/redux-immutable

//const store = createStoreWithMiddleware(reducer);
const store = createStoreWithMiddleware(rootReducer, myOrderList);
console.log(store.getState());
// store.dispatch(getServices());
// store.dispatch(getServiceInstances());
//store.dispatch(setState(myOrderList));


class App extends Component {
	constructor(props) {
		super(props);

		this.state = fromJS(
			{
				services: [],
				cart: []
			}
		);
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
						<Route path="/checkout" component={CheckoutContainer}/>
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
