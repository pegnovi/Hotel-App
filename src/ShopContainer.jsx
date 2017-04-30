import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import ReactTable from 'react-table';

import 'react-table/react-table.css'

import ShopServiceVisual from './ShopServiceVisual';

import 'whatwg-fetch'; //fetch

export default class ShopContainer extends Component {
	render() {

		// Sample product data
		const data = [
			{
				serviceId: 'mr1',
				picture: require('./images/massage.png'),
				name: 'Massage',
				description: 'A very rough massage',
				price: 26
			},
			{
				serviceId: 'bib1',
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
			// TODO: Link to page where service details are inputted before adding to cart/creating serviceInstance
			{
				header: 'Add to Cart',
				accessor: 'serviceId',
				render: props => {
					return <div>
						<Link to={`/serviceInstance/${props.value}`}>
							<button>
								Add to Cart
							</button>
						</Link>
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