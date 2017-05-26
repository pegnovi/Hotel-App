// Keep reducer as simple as possible
// Reducer is only for updating client-side state

import { remove } from 'lodash';

function setState(state, newState) {
	
	let finalState = Object.assign(state, newState);

	console.log(finalState);

	return finalState;
}

function addToCart(state, item) {
	console.log(item);
	console.log('ADD TO CART');
	state.cart.push(item);
	return state;
}

function removeFromCart(state, item) {
	console.log('REMOVE FROM CART');
	remove(state.cart, (cartObj) => cartObj.id === item.serviceInstanceId);
	return state;
}

function getServices(state, action) {
	console.log(action);
	return state;
}

export default function(state = {cart: []}, action) {
	switch(action.type) {
		case 'GET_SERVICES':
			return getServices(state, action);
		case 'SET_STATE':
			return setState(state, action.state);
		case 'ADD_TO_CART':
			return addToCart(state, action.data);
		case 'REMOVE_FROM_CART':
			return removeFromCart(state, action.data);
		default:
			return state;
	}
}
