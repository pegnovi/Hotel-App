
import { BrowserRouter as Router, Route } from 'react-router-dom';

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CustomNavigationBar from './CustomNavigationBar';

import ServiceInstance from './ServiceInstance';

import ProductTable from './ProductTable';

import { Link } from 'react-router-dom';

import 'whatwg-fetch'; //fetch


const TestParam = ({match}) => {
	return (
		<div>
			{match.params.testText}
		</div>
	);
}


// No more nested routes in react-router v4
//https://stackoverflow.com/questions/41474134/nested-routes-with-react-router-v4

import { FieldGroupDateTime } from './FieldGroup';
class Room extends Component {
	constructor(props) {
		super(props);

		// initialize app state
		this.state = {};
	}
	componentDidMount() {
		this.setState({
			bookingStartDate: '',
			bookingEndDate: ''
		});
	}
	render() {
		console.log(this);
		return (
			<div>
				Room {this.props.match.params.roomId}

				<br/>

				Room Price: ???

				<br/>

				Room Details: ???

				<br/>

				<FieldGroupDateTime
					id="bookingStartDate"
					label="Booking Start Date"
					onChange={(value) => {
						const dateFormat = 'MM-DD-YYYY h:mm A';
						this.setState({ bookingStartDate: value.format(dateFormat)});
					}}
				/>

				<FieldGroupDateTime
					id="bookingEndDate"
					label="Booking End Date"
					onChange={(value) => {
						const dateFormat = 'MM-DD-YYYY h:mm A';
						this.setState({ bookingEndDate: value.format(dateFormat)});
					}}
				/>

				<br/>

				Book This Room!

				<br/>

			</div>
		);
	}
}

class Rooms extends Component {

	render() {

		let roomLinks = this.props.roomIds.map((roomId) => {
			return (
				<Link key={'room' + roomId.toString()} to={`rooms/${roomId}`}>
					Room {roomId}
				</Link>
			);
		});

		return (
			<div>
				Rooms

				<br />

				{roomLinks}


			</div>
		);
	}
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
	constructor(props) {
		super(props);

		this.state = {
			services: [],
			serviceInstances: []
		};
	}

	componentDidMount() {
		fetch('/api/services')
		.then((response) => {
			return response.json();
		})
		.then((services) => {
			this.setState({
				services: services
			})
		})
		.catch((error) => {
			throw error;
		});
	}

	render() {
		return (
			<Router>
				<div className="App">
					<div className="App-header">
						<img src={logo} className="App-logo" alt="logo" />
						<h2>Welcome to React</h2>
					</div>

					<CustomNavigationBar/>

					<Route exact path={`/rooms/:roomId`} component={Room}/>
					<Route exact path="/rooms" render={() => <Rooms roomIds={[1,2,3]}/>} />
					
					<Route path="/test/:testText" component={TestParam}/>
					<Route path="/shop/" render={() => <ProductTable
							tableHeader={'Shop'}
							//data={this.state.services}
							data={myOrderList}

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
							data={myOrderList}

							extraColumns={[
								{
									header: 'Action',
									accessor: 'instanceId',
									component: ((props) => {
										return <div>
												<button onClick={props.onClick}>
													Remove From Cart
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
