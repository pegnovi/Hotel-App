import React, { Component } from 'react';

import massage from './images/massage.png';

export default class ShopServiceVisual extends Component {
	render() {
		return <div>
			<img src={massage} alt=""/>
			<img src={require('./images/breakfastInBed.png')} alt=""/>
		</div>
	}
}