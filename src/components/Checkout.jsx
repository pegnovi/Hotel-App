import React, { Component } from 'react';
import ProductTable from './ProductTable';
import { connect } from 'react-redux';

import { find, cloneDeep } from 'lodash';

import * as cartActions from '../actions/cart_actions';

import { toJS } from 'immutable';

export class Checkout extends Component {

	render() {

		let services = this.props.services.toJS();
		let data = this.props.data.toJS();

		let cartData = data.map((dataObj) => {
			let targetService = find(services, (o) => o.id === dataObj.serviceId);
			if(targetService) {
				let nuDataObj = cloneDeep(targetService);
				nuDataObj.instanceId = dataObj.id;
				return nuDataObj;
			}
			return null;
		});


		return (
			<div>
				<ProductTable
					tableHeader={'Checkout'}
					data={cartData}
				/>

				
				<p>
					Purchase Services
				</p>
				<button onClick={() => {this.props.buyServices(data);}}>
					Purchase Now!
				</button>
				

			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		services: state.get('services'),
		data: state.get('cart')
	}
}

export const CheckoutContainer = connect(
	mapStateToProps,
	cartActions
)(Checkout);
