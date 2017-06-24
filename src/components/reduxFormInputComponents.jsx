import React from 'react';
import { FormGroup, Col, ControlLabel } from 'react-bootstrap';
import DateTime from 'react-datetime';

// For use with redux-form
export function DateTimeInputField({ input, label, type, meta: { touched, error } }) {
	return (
		<div>
			<FormGroup controlId={input.name}>
				<Col xs={3} md={3}>
					<ControlLabel>{label}</ControlLabel>
				</Col>
				<Col xs={6} md={6}>
					<DateTime {...input}/>
				</Col>
				{touched && error && <span>{error}</span>}
			</FormGroup>
			<br />
			<br />
		</div>
	);
}

export function TextInputField({ input, label, type, meta: { touched, error } }) {
	return (
		<div>
			<label>{label}</label>
			<div>
				<input {...input} type={type} placeholder={label}/>
				{touched && error && <span>{error}</span>}
			</div>
		</div>
	);
}