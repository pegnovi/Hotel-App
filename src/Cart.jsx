import React, { Component } from 'react';
import ProductTable from './ProductTable';
import { connect } from 'react-redux';

import * as actionCreators from './action_creators';

export class Cart extends Component {

	render() {
		return (
			<div>
				<ProductTable
					tableHeader={'Cart'}
					data={this.props.data}

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
		data: state.cart
	}
}

export const CartContainer = connect(
	mapStateToProps,
	actionCreators
)(Cart);
