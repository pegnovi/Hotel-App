import React, { Component } from 'react';
import ProductTable from './ProductTable';
import { connect } from 'react-redux';

import { find, cloneDeep } from 'lodash';

import * as cartActions from '../actions/cart_actions';

import { mergeCartAndServices } from './cartServiceMerger';

import { toJS } from 'immutable';

export class Checkout extends Component {

	render() {

		let services = this.props.services.toJS();
		let data = this.props.data.toJS();

		const cartData = mergeCartAndServices(data, services, false);

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
				<button onClick={() => {this.props.buyServices(cartData);}}>
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
