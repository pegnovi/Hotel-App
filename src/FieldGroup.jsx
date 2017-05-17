import React, { Component } from 'react';
import { FormGroup, Col, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import DateTime from 'react-datetime';

export function FieldGroup({ id, label, help, ...props }) {
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

export function FieldGroupDateTime({ id, label, help, ...props }) {
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