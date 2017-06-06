import React, { Component } from 'react';
import ProductTable from './ProductTable';
import { connect } from 'react-redux';

import { find, cloneDeep } from 'lodash';

import * as serviceInstanceActions from '../actions/service_instance_actions';

import { mergeServicesAndInstances } from './serviceMerger';

import { toJS } from 'immutable';

export class Checkout extends Component {

	render() {

		const services = this.props.services.toJS();
		const serviceInstances = this.props.serviceInstances.toJS();

		const cartData = mergeServicesAndInstances(serviceInstances, services, false);

		console.log(cartData);

		return (
			<div>
				<ProductTable
					tableHeader={'Checkout'}
					data={cartData}
				/>

				
				<p>
					Purchase Services
				</p>
				<button onClick={() => {this.props.buyServiceInstances(cartData);}}>
					Purchase Now!
				</button>
				

			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		services: state.get('services'),
		serviceInstances: state.get('serviceInstances')
	}
}

export const CheckoutContainer = connect(
	mapStateToProps,
	serviceInstanceActions
)(Checkout);
