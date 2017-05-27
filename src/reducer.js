// Keep reducer as simple as possible
// Reducer is only for updating client-side state

import { remove } from 'lodash';

function setState(state, newState) {
	
	let finalState = Object.assign(state, newState);

	console.log(finalState);

	return finalState;
}

function setToCart(state, serviceInstance) {
	state.cart.push(serviceInstance);
	return state;
}

function removeFromCart(state, item) {
	console.log('REMOVE FROM CART');
	remove(state.cart, (cartObj) => cartObj.id === item.serviceInstanceId);
	return state;
}


function setServices(state, action) {
	state.services = action.data;
	return state;
}
function setServiceInstances(state, action) {
	state.cart = action.data;
	return state;
}

export default function(state = {cart: []}, action) {
	switch(action.type) {
		case 'SET_SERVICES':
			return setServices(state, action);
		case 'SET_SERVICE_INSTANCES':
			return setServiceInstances(state, action);
		case 'SET_TO_CART':
			return setToCart(state, action.data);
		case 'SET_STATE':
			return setState(state, action.state);
		case 'REMOVE_FROM_CART':
			return removeFromCart(state, action.data);
		default:
			return state;
	}
}
