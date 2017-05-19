import React, { Component } from 'react';
import ProductTable from './ProductTable';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class Shop extends Component {

	render() {
		return (
			<div>
				<ProductTable
					tableHeader={'Shop'}
					//data={this.state.services}
					data={this.props.data}

					extraColumns={[
						{
							header: 'Action',
							accessor: 'serviceId',
							component: ((props) => {
								return <div>
									<Link to={`/serviceInstance/${props.accessor}`}>
										<button>
											Add to Cart
										</button>
									</Link>
								</div>
							}),
							componentProps: {}
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

export const ShopContainer = connect(mapStateToProps)(Shop);
