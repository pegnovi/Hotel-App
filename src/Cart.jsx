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
										<button onClick={this.props.removeFromCart}>
											Remove From Cart
										</button>
								</div>
							}),
							componentProps: {
								onClick: () => {
									console.log('TODO: Remove from Cart');
								}
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
