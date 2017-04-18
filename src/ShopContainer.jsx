import React, { Component } from 'react';

import ReactTable from 'react-table';

import 'react-table/react-table.css'

import ShopServiceVisual from './ShopServiceVisual';

export default class ShopContainer extends Component {
	render() {
		const data = [
			{
				picture: 'massage.png',
				name: 'Massage',
				description: 'A very rough massage',
				price: 26
			},
			{
				picture: 'breakfastInBed.png',
				name: 'Breakfast in Bed',
				description: 'You can choose from a menu',
				price: 41
			}
		];



		const columns = [
			{
				header: 'Picture',
				accessor: 'picture'
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