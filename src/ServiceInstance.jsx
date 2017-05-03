import React, { Component } from 'react';

import { FormGroup, Col, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';

import DateTime from 'react-datetime';

function FieldGroup({ id, label, help, ...props }) {
	return (
		<FormGroup controlId={id}>
			<Col xs={3} md={3}>
				<ControlLabel>{label}</ControlLabel>
			</Col>
			<Col xs={6} md={6}>
				<FormControl {...props} />
			</Col>
			{help && <HelpBlock>{help}</HelpBlock>}
		</FormGroup>
	);
}

function FieldGroupDateTime({ id, label, help, ...props }) {
	return (
		<FormGroup controlId={id}>
			<Col xs={3} md={3}>
				<ControlLabel>{label}</ControlLabel>
			</Col>
			<Col xs={6} md={6}>
				<DateTime {...props} />
			</Col>
			{help && <HelpBlock>{help}</HelpBlock>}
		</FormGroup>
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
				onChange={(e) => {
					this.setState({ scheduledDateTime: e.target.value});
				}}
			/>

			<Button 
				onClick={() => {
					console.log(this.state);
					//TODO: save serviceId, cartId, scheduledDateTime
				}}
			>
				Submit
			</Button>
		</div>
	}
};