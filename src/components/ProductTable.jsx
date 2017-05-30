import React, { Component } from 'react';

import ReactTable from 'react-table';
import 'react-table/react-table.css'

import ProductImage from './ProductImage';

export default class ProductTable extends Component {
	render() {

		const columns = [
			{
				header: 'Picture',
				accessor: 'pictureKey',
				render: props => <ProductImage pictureKey={props.value}/>
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

		const extraColumns = this.props.extraColumns;
		if(extraColumns) {
			extraColumns.map((columnData) => {
				let TempComponent = columnData.component;
				columns.push({
					header: columnData.header,
					accessor: columnData.accessor,
					render: props => {
						return (<div>
							<TempComponent accessor={props.value} {...columnData.componentProps} />
						</div>);
					}
				});
				return true;
			});
		}

		return (
			<div>
				<h1> {this.props.tableHeader} </h1>

				<div>
					<ReactTable
						data={this.props.data}
						columns={columns}
						pageSize={1}
					/>
				</div>
			</div>
		);
	}
}