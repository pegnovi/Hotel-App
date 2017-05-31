import React, { Component } from 'react';
import ProductTable from './ProductTable';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { toJS } from 'immutable';

export class Shop extends Component {

	render() {
		console.log(this.props.data.toJS());
		return (
			<div>
				<ProductTable
					tableHeader={'Shop'}
					//data={this.state.services}
					data={this.props.data.toJS()}

					extraColumns={[
						{
							header: 'Action',
							accessor: 'id',
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
		data: state.get('services')
	}
}

export const ShopContainer = connect(mapStateToProps)(Shop);
