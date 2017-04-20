import React, { Component } from 'react';

import ReactTable from 'react-table';

import 'react-table/react-table.css'

import ShopServiceVisual from './ShopServiceVisual';

import 'whatwg-fetch'; //fetch

export default class ShopContainer extends Component {
	render() {

		// Sample product data
		const data = [
			{
				productId: 'mr1',
				picture: require('./images/massage.png'),
				name: 'Massage',
				description: 'A very rough massage',
				price: 26
			},
			{
				productId: 'bib1',
				picture: require('./images/breakfastInBed.png'),
				name: 'Breakfast in Bed',
				description: 'You can choose from a menu',
				price: 41
			}
		];



		const columns = [
			{
				header: 'Picture',
				accessor: 'picture',
				render: props => <ShopServiceVisual pictureBlob={props.value}/>
			},
			{
				header: 'Service Name',
				accessor: 'name' // String-based value accessors!
			},
			{
				header: 'Description',
				accessor: 'description'
			},
			{
				header: 'Price',
				accessor: 'price',
				render: props => <span>{'$' + props.value}</span> // Custom cell components!
			},
			{
				header: 'Add to Cart',
				accessor: 'productId',
				render: props => {
					return <div>
						<button onClick={() => {
							console.log('adding to cart');
							console.log(props);
						}}>
							Add to Cart
						</button>
					</div>
				}
			}
		];
		
		return <div>
			<ShopServiceVisual/>
			<ReactTable
				data={data}
				columns={columns}
				pageSize={1}
			/>
		</div>
	}
};