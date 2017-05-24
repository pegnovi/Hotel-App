export function setState(state) {
	return {
		type: 'SET_STATE',
		state
	};
}

export function addToCart(data) {
	return {
		type: 'ADD_TO_CART',
		data
	};
}

export function removeFromCart(data) {
	return {
		type: 'REMOVE_FROM_CART',
		data
	};
}

export function getServices() {
	return {
		type: 'GET_SERVICES'
	};
}
