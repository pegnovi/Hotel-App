
import React, { Component } from 'react';

// http://redux-form.com/6.2.0/examples/immutable/
import { Field, reduxForm } from 'redux-form/immutable';

const renderField = ({ input, label, type, meta: { touched, error } }) => {
	return <div>
		<label>{label}</label>
		<div>
			<input {...input} type={type} placeholder={label}/>
			{touched && error && <span>{error}</span>}
		</div>
	</div>
}

const doSubmit = (values) => {
	console.log(values);
}

class ContactForm extends Component {
	submit(values) {
		console.log(values);
	}
	render() {
		const { handleSubmit, invalid, pristine, reset, submitting } = this.props;
		return (
			<form onSubmit={handleSubmit(doSubmit)}>
				<Field name="firstName" component={renderField} type="text" label="First Name"/>
				<Field name="lastName" component={renderField} type="text" label="Last Name"/>
				<Field name="email" component={renderField} type="email" label="E-mail"/>
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
	form: 'contact' // a unique name for this form
})(ContactForm);