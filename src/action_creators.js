export function setState(state) {
	return {
		type: 'SET_STATE',
		state
	};
}

export function addToCart(item) {
	return {
		type: 'ADD_TO_CART',
		item
	};
}

export function removeFromCart(item) {
	return {
		type: 'REMOVE_FROM_CART',
		item
	};
}
