import { Map, List, fromJS } from 'immutable';

function setServiceInstances(state, action) {
	return state.set('cart', fromJS(action.data));
}

function setToCart(state, action) {
	console.log('ADD TO CART');
	return state.update('cart', (cart) => cart.push(action.data));
}

function removeFromCart(state, action) {
	console.log('REMOVE FROM CART');
	return state.update('cart', (cart) => cart.filterNot((cartItem) => cartItem.id === action.data.instanceId));
}

export default function(state = fromJS({services: [], cart: []}), action) {
	switch(action.type) {
		case 'SET_SERVICE_INSTANCES':
			return setServiceInstances(state, action);
		case 'SET_TO_CART':
			return setToCart(state, action);
		case 'REMOVE_FROM_CART':
			return removeFromCart(state, action);
		default:
			return state;
	}
}