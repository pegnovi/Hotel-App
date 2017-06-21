
import React, { Component } from 'react';

// http://redux-form.com/6.2.0/examples/immutable/
import { Field, reduxForm } from 'redux-form/immutable';

import { toJS } from 'immutable';

const validate = values => {
	const errors = {};

	if(!values.get('firstName')) {
		errors.firstName = 'Required';
	}
	if(!values.get('lastName')) {
		errors.lastName = 'Required';
	}
	if(!values.get('email')) {
		errors.email = 'Required';
	}
	return errors;

};

const renderField = ({ input, label, type, meta: { touched, error } }) => {
	return <div>
		<label>{label}</label>
		<div>
			<input {...input} type={type} placeholder={label}/>
			{touched && error && <span>{error}</span>}
		</div>
	</div>
}


import { FormGroup, Col, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import DateTime from 'react-datetime';
//const dateField = ({ id, label, help, ...props }) 
const dateField = ({ input, label, type, meta: { touched, error } }) => {
	console.log(input)
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

const validDate = (value) => {
	const invalidDateMessage = 'Invalid Date';
	if(value) {
		if(typeof value === 'String') {
			return invalidDateMessage;
		}
		else {
			if(value.isValid()) {
				return undefined;
			}
			else {
				return invalidDateMessage;
			}
		}
	}
	else {
		return invalidDateMessage;
	}
}

const doSubmit = (values) => {
	console.log(values.toJS());
}

class ContactForm extends Component {
	render() {
		const { handleSubmit, invalid, pristine, reset, submitting } = this.props;

		// console.log(submitting);
		// console.log(invalid);
		// console.log(pristine);

		return (
			<form onSubmit={handleSubmit(doSubmit)}>
				<Field name="firstName" component={renderField} type="text" label="First Name"/>
				<Field name="lastName" component={renderField} type="text" label="Last Name"/>
				<Field name="email" component={renderField} type="email" label="E-mail"/>
				<Field name="randomDate" component={dateField} type="datetime" label="Random Date" validate={validDate}/>
				<div>
					<button type="submit" disabled={invalid || submitting}>Submit</button>
					<button type="button" disabled={pristine || submitting} onClick={reset}>Clear</button>
				</div>
			</form>
		);
	}
}

// Decorate the form component
export default reduxForm({
	form: 'contact', // a unique name for this form
	validate, // validation function
})(ContactForm);