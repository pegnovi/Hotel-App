import { Map, List, fromJS, toJS } from 'immutable';

function setServiceInstances(state, action) {
	return state.merge(fromJS(action.data));
}

function setToCart(state, action) {
	console.log('ADD TO CART');
	return state.push(action.data);
}

function removeServiceInstances(state, action) {
	console.log('REMOVE SERVICE INSTANCES');
	//could actually just empty the cart but will leave this here incase some flexibility is needed
	const instancesToRemove = fromJS(action.data.map((instance) => instance.id));
	return state.filter((cartItem) => instancesToRemove.includes(cartItem.id))
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
		case 'REMOVE_SERVICE_INSTANCES':
			return removeServiceInstances(state, action);
		default:
			return state;
	}
}