import React, { Component } from 'react';
import { FieldGroupDateTime } from './FieldGroup';


export default class Room extends Component {
	constructor(props) {
		super(props);

		// initialize app state
		this.state = {};
	}
	componentDidMount() {
		this.setState({
			bookingStartDate: '',
			bookingEndDate: ''
		});
	}
	render() {

		return (
			<div>
				Room {this.props.match.params.roomId}

				<br/>

				Room Price: ???

				<br/>

				Room Details: ???

				<br/>

				<FieldGroupDateTime
					id="bookingStartDate"
					label="Booking Start Date"
					onChange={(value) => {
						const dateFormat = 'MM-DD-YYYY h:mm A';
						this.setState({ bookingStartDate: value.format(dateFormat)});
					}}
				/>

				<FieldGroupDateTime
					id="bookingEndDate"
					label="Booking End Date"
					onChange={(value) => {
						const dateFormat = 'MM-DD-YYYY h:mm A';
						this.setState({ bookingEndDate: value.format(dateFormat)});
					}}
				/>

				<br/>

				Book This Room!

				<br/>

			</div>
		);
	}
}
