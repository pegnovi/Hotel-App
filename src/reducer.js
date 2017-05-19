function setState(state, newState) {
	return newState;
}

function addToCart(state, item) {
	console.log('ADD TO CART');
	return state;
}

function removeFromCart(state, item) {
	console.log('REMOVE FROM CART');
	return state;
}

export default function(state = {cart: []}, action) {
	switch(action.type) {
		case 'SET_STATE':
			return setState(state, action.state);
		case 'ADD_TO_CART':
			return addToCart(state, action.item);
		case 'REMOVE_FROM_CART':
			return removeFromCart(state, action.item);
		default:
			return state;
	}
}
