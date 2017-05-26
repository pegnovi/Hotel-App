import React, { Component } from 'react';
import ProductTable from './ProductTable';
import { connect } from 'react-redux';

import { find, cloneDeep } from 'lodash';

import * as actionCreators from './action_creators';

export class Cart extends Component {

	render() {

		let services = this.props.services;
		let data = this.props.data;

		let cartData = data.map((dataObj) => {
			let targetService = find(services, (o) => o.id === dataObj.serviceid);
			if(targetService) {
				let nuDataObj = cloneDeep(targetService);
				nuDataObj.instanceId = dataObj.id;
				return nuDataObj;
			}
			return null;
		});

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
												serviceInstanceId: props.accessor
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
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		services: state.services,
		data: state.cart
	}
}

export const CartContainer = connect(
	mapStateToProps,
	actionCreators
)(Cart);
