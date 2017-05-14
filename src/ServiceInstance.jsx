import React, { Component } from 'react';

import { FormGroup, Col, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';

import DateTime from 'react-datetime';

import 'whatwg-fetch'; //fetch

function FieldGroup({ id, label, help, ...props }) {
	return (
		<div>
			<FormGroup controlId={id}>
				<Col xs={3} md={3}>
					<ControlLabel>{label}</ControlLabel>
				</Col>
				<Col xs={6} md={6}>
					<FormControl {...props} />
				</Col>
				{help && <HelpBlock>{help}</HelpBlock>}
			</FormGroup>
			<br />
			<br />
		</div>
		
	);
}

function FieldGroupDateTime({ id, label, help, ...props }) {
	return (
		<div>
			<FormGroup controlId={id}>
				<Col xs={3} md={3}>
					<ControlLabel>{label}</ControlLabel>
				</Col>
				<Col xs={6} md={6}>
					<DateTime {...props} />
				</Col>
				{help && <HelpBlock>{help}</HelpBlock>}
			</FormGroup>
			<br />
			<br />
		</div>
	);
}

// TODO: Form input validation (validationState)
// TODO: Form value saving (onChange handler to set state)

export default class ServiceInstance extends Component {
	constructor(props) {
		super(props);

		// initialize app state
		this.state = {};
	}
	componentDidMount() {
		this.setState({
			val: '',
			scheduledDateTime: ''
		});
	}
	render() {
		return <div>
			Hello {this.props.match.params.serviceId}

			{/* Add product details here */}

			<FieldGroup
				id="val"
				type="text"
				label="Value"
				placeholder="Enter Value"
				value={this.state.text}
				onChange={(e) => {
					this.setState({ val: e.target.value});
				}}
			/>

			<FieldGroupDateTime
				id="scheduledDateTime"
				label="Scheduled Date Time"
				value={this.state.scheduledDateTime}
				onChange={(value) => {
					const dateFormat = 'MM-DD-YYYY h:mm A';
					this.setState({ scheduledDateTime: value.format(dateFormat)});
				}}
			/>

			<Button 
				onClick={() => {
					// TODO: Probably move all this logic elsewhere
					console.log(this.state);
					// TODO: save serviceId, cartId, scheduledDateTime

					const serviceInstance = {
						serviceId: this.props.match.params.serviceId,
						cartId: '2a', // user specific
						scheduledDateTime: this.state.scheduledDateTime
					};

					const options = {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(serviceInstance)
					};
					fetch('/api/serviceInstances', options)
					.then(() => {
						//let updatedTodos = this.state.todos.map(item => item);
						//updatedTodos.push(todo);
						//this.setState({ todos: updatedTodos });
						console.log('serviceInstance saved');
					})
					.catch((error) => {
						throw error;
					});

				}}
			>
				Submit
			</Button>
		</div>
	}
};