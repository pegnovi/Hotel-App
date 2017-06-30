import React, { Component } from 'react';


import { find } from 'lodash';

import * as serviceInstanceActions from '../actions/service_instance_actions';
import { connect } from 'react-redux';

import { toJS } from 'immutable';

// Redux-Form
import { Field, reduxForm } from 'redux-form/immutable';
import { DateTimeInputField, TextInputField } from './reduxFormInputComponents';
import { required, validDate } from './validators';

// TODO: Form input validation (validationState)
// TODO: Form value saving (onChange handler to set state)

export class ServiceInstance extends Component {

	render() {

		const chosenService = find(this.props.data.toJS(),
			(obj) => {
				return obj.id === this.props.match.params.id;
			}
		);

		const { handleSubmit, invalid, pristine, reset, submitting } = this.props;


		const doSubmit = (values) => {
			const jsValues = values.toJS();
			const serviceInstanceDetails = {
				serviceId: this.props.serviceId,
				cartId: this.props.cartId, // user specific
				scheduledDateTime: jsValues.scheduledDateTime.format('MM/DD/YYYY HH:mm'),
				purchased: false
			};
			this.props.addToCart(serviceInstanceDetails); 
		}

		return <div>

			Hello {this.props.match.params.id}

			<br/>
			{chosenService.name}
			<br/>
			{chosenService.description}
			<br/>
			{chosenService.price}
			<br/>

			<form onSubmit={handleSubmit(doSubmit)}>
			
				<Field name="scheduledDateTime" component={DateTimeInputField} type="datetime" label="Scheduled Date Time" validate={validDate}/>
				<div>
					<button type="submit" disabled={invalid || submitting}>Submit</button>
					<button type="button" disabled={pristine || submitting} onClick={reset}>Clear</button>
				</div>
			</form>

		</div>
	}
}


// http://redux-form.com/6.0.0-alpha.4/examples/initializeFromState/
function mapStateToProps(state) {
	return {
		data: state.get('services')
	};
}

const ServiceInstanceForm = reduxForm({
	form: 'serviceInstanceForm', // a unique name for this form
	//validate, // validation function
})(ServiceInstance);

export const ServiceInstanceContainer = connect(
	mapStateToProps,
	serviceInstanceActions
)(ServiceInstanceForm);
