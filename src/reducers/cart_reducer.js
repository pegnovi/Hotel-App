import { Map, List, fromJS } from 'immutable';

function setServiceInstances(state, action) {
	return state.merge(fromJS(action.data));
}

function setToCart(state, action) {
	console.log('ADD TO CART');
	return state.push(action.data);
}

function removeFromCart(state, action) {
	console.log('REMOVE FROM CART');
	return state.filterNot((cartItem) => cartItem.id === action.data.instanceId);
}

export default function(state = fromJS([]), action) {
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