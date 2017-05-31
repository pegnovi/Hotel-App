import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Route } from 'react-router-dom';

import Room from './Room';

// No more nested routes in react-router v4
//https://stackoverflow.com/questions/41474134/nested-routes-with-react-router-v4
//https://stackoverflow.com/questions/43035786/render-a-sub-route-in-react-router-v4

export default class Rooms extends Component {

	render() {

		//console.log(this);

		let roomLinks = this.props.roomIds.map((roomId) => {
			return (
				<Link key={'room' + roomId.toString()} to={`/rooms/${roomId}`}>
					Room {roomId}
				</Link>
			);
		});

		return (

				<div>
					Rooms

					<br />

					{roomLinks}


					<Route path={`/rooms/:roomId`} component={Room}/>


				</div>

		);
	}
}
