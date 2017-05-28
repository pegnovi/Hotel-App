// Keep reducer as simple as possible
// Reducer is only for updating client-side state

import { remove, cloneDeep } from 'lodash';

function setState(state, newState) {
	
	let finalState = Object.assign(state, newState);

	console.log(finalState);

	return finalState;
}

function setToCart(state, serviceInstance) {
	console.log('ADD TO CART');
	let nextState = cloneDeep(state);
	nextState.cart.push(serviceInstance);
	return nextState;
}

function removeFromCart(state, item) {
	console.log('REMOVE FROM CART');
	let nextState = cloneDeep(state);
	remove(nextState.cart, (cartObj) => cartObj.id === item.instanceId);
	return nextState;
}


function setServices(state, action) {
	let nextState = cloneDeep(state);
	nextState.services = action.data;
	return nextState;
}
function setServiceInstances(state, action) {
	let nextState = cloneDeep(state);
	nextState.cart = action.data;
	return nextState;
}

export default function(state = {services: [], cart: []}, action) {
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
