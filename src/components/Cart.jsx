import React, { Component } from 'react';
import ProductTable from './ProductTable';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { find, cloneDeep } from 'lodash';

import * as serviceInstanceActions from '../actions/service_instance_actions';

import { toJS } from 'immutable';

import { mergeServicesAndInstances } from './serviceMerger';

export class Cart extends Component {

	render() {

		const services = this.props.services.toJS();
		const serviceInstances = this.props.serviceInstances.toJS();

		const cartData = mergeServicesAndInstances(serviceInstances, services, false);

		console.log(cartData);

		return (
			<div>
				<ProductTable
					tableHeader={'Cart'}
					data={cartData}

					extraColumns={[
						{
							header: 'Action',
							accessor: 'instanceId',
							component: ((props) => {
								return <div>
									<button
										onClick={() => {
											const serviceInstanceDetails = {
												instanceId: props.accessor
											};
											this.props.removeFromCart(serviceInstanceDetails);
										}
									}>
										Remove From Cart
									</button>
								</div>
							}),
							componentProps: {
							}
						}
					]}
				/>

				<Link to={`/checkout`}>
					<button>
						Checkout
					</button>
				</Link>

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

export const CartContainer = connect(
	mapStateToProps,
	serviceInstanceActions
)(Cart);
