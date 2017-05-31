// Keep reducer as simple as possible
// Reducer is only for updating client-side state

import { remove, cloneDeep } from 'lodash';

import { Map, List, fromJS } from 'immutable';

function setState(state, newState) {
	return state.merge(newState);
}

function setToCart(state, serviceInstance) {
	console.log('ADD TO CART');
	return state.update('cart', (cart) => cart.push(serviceInstance));
}

function removeFromCart(state, item) {
	console.log('REMOVE FROM CART');
	return state.update('cart', (cart) => cart.filterNot((cartItem) => cartItem.id === item.instanceId));
}


function setServices(state, action) {
	return state.set('services', fromJS(action.data));
}
function setServiceInstances(state, action) {
	return state.set('cart', fromJS(action.data));
}

export default function(state = fromJS({services: [], cart: []}), action) {
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