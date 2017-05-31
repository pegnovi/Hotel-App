import React, { Component } from 'react';

const imageMappings = {
	massage: require('../images/massage.png'),
	breakfastInBed: require('../images/breakfastInBed.png')
};

export default class ShopServiceVisual extends Component {

	render() {
		return <div>
			<img src={imageMappings[this.props.pictureKey]} alt=""/>
		</div>
	}
}