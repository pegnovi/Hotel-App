
import { BrowserRouter as Router, Route } from 'react-router-dom';

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CustomNavigationBar from './CustomNavigationBar';

import ServiceInstance from './ServiceInstance';

import ProductTable from './ProductTable';

import { Link } from 'react-router-dom';

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
					<Route path="/test/:testText" component={TestParam}/>
					<Route path="/shop/" render={() => <ProductTable
							tableHeader={'Shop'}
							tableType={'shop'}
							data={myOrderList}

							buttonAccessor={'serviceId'}
							buttonText={'Add to Cart'}
							buttonHandler={() => { console.log('TODO: Add to Cart'); }}

							extraColumns={[
								{
									header: 'Action',
									accessor: 'serviceId',
									component: ((props) => {
										return <div>
											<Link to={`/serviceInstance/${props.accessor}`}>
												<button>
													Add to Cart
												</button>
											</Link>
										</div>
									}),
									componentProps: {}
								}
							]}
						/>
					} />
					<Route path="/serviceInstance/:serviceId" component={ServiceInstance}/>
					<Route path="/cart/" render={() => <ProductTable
							tableHeader={'Cart'}
							tableType={'cart'}
							data={myOrderList}

							extraColumns={[
								{
									header: 'Action',
									accessor: 'instanceId',
									component: ((props) => {
										return <div>
												<button onClick={props.onClick}>
													Add to Cart
												</button>
										</div>
									}),
									componentProps: {
										onClick: () => {
											console.log('TODO: Remove from Cart');
										}
									}
								}
							]}
						/>
					} />
					<Route path="/orders/" render={() => <ProductTable
							tableHeader={'Orders'}
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
