

import { BrowserRouter as Router, Route } from 'react-router-dom';

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CustomNavigationBar from './CustomNavigationBar';
import ShopContainer from './ShopContainer';
import ServiceInstance from './ServiceInstance';

import ShopServiceVisual from './ShopServiceVisual';

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

class TestColumnComponent extends Component {
	render() {
		console.log(this.props);
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

		const extraColumns = this.props.extraColumns;
		if(extraColumns) {
			extraColumns.map((columnData) => {
				let TempComponent = columnData.component;
				columns.push({
					header: columnData.header,
					accessor: columnData.accessor,
					render: props => {
						return (<div>
							<TempComponent accessor={props.value} {...columnData.componentProps} />
						</div>);
					}
				})
			});
		}

		return (
			<div>
				<h1> {this.props.tableHeader} </h1>

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
								},
								{
									header: 'Action',
									accessor: 'serviceId',
									component: TestColumnComponent,
									componentProps: {
										ttt: '3'
									}
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
