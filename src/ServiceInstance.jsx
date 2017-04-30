import React, { Component } from 'react';

export default class ServiceInstance extends Component {
	render() {
		return <div>
			Hello {this.props.match.params.serviceId}
		</div>
	}
};