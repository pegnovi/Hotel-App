import React, { Component } from 'react';
import ProductTable from './ProductTable';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { find, cloneDeep } from 'lodash';

import { toJS } from 'immutable';

import { mergeServicesAndInstances } from './serviceMerger';

export class Orders extends Component {

	render() {

		const services = this.props.services.toJS();
		const serviceInstances = this.props.serviceInstances.toJS();

		const orders = mergeServicesAndInstances(serviceInstances, services, true);

		console.log(orders);

		return (
			<div>
				<ProductTable
					tableHeader={'Orders'}
					data={orders}
				/>

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

export const OrdersContainer = connect(
	mapStateToProps
)(Orders);
