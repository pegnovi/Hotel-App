
import React, { Component } from 'react';

// http://redux-form.com/6.2.0/examples/immutable/
import { Field, reduxForm } from 'redux-form/immutable';

import { DateTimeInputField, TextInputField } from './reduxFormInputComponents';

import { toJS } from 'immutable';

import { required, validDate } from './validators';

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
				<Field name="firstName" component={TextInputField} type="text" label="First Name" validate={required}/>
				<Field name="lastName" component={TextInputField} type="text" label="Last Name"/>
				<Field name="email" component={TextInputField} type="email" label="E-mail"/>
				<Field name="randomDate" component={DateTimeInputField} type="datetime" label="Random Date" validate={validDate}/>
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
	//validate, // validation function
})(ContactForm);