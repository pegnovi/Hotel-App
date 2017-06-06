import { Map, List, fromJS, toJS } from 'immutable';

function setServiceInstances(state, action) {
	return state.merge(fromJS(action.data));
}

function addServiceInstance(state, action) {
	console.log('ADD SERVICE INSTANCE');
	return state.push(action.data);
}

function purchaseServiceInstances(state, action) {
	const cartInstanceIds = fromJS(action.data).map(
		(cartInstanceObj) =>  cartInstanceObj.get('instanceId')
	);
	const nextState = state.map((item) => {
		const index = cartInstanceIds.findIndex((instanceId) => instanceId === item.get('id'));
		if(index !== -1) {
			return item.setIn(['purchased'], true);
		}
		return item;
	});
	return nextState;
}

function removeServiceInstances(state, action) {
	console.log('REMOVE SERVICE INSTANCES');
	//could actually just empty the cart but will leave this here incase some flexibility is needed
	const instancesToRemove = fromJS(action.data.map((instance) => instance.id));
	return state.filter((cartItem) => instancesToRemove.includes(cartItem.id))
}

function removeServiceInstance(state, action) {
	console.log('REMOVE FROM CART');
	return state.filterNot((cartItem) => cartItem.id === action.data.instanceId);
}

export default function(state = fromJS([]), action) {
	switch(action.type) {
		case 'SET_SERVICE_INSTANCES':
			return setServiceInstances(state, action);
		case 'ADD_SERVICE_INSTANCE':
			return addServiceInstance(state, action);
		case 'REMOVE_SERVICE_INSTANCE':
			return removeServiceInstance(state, action);
		case 'REMOVE_SERVICE_INSTANCES':
			return removeServiceInstances(state, action);
		case 'PURCHASE_SERVICE_INSTANCES':
			return purchaseServiceInstances(state, action);
		default:
			return state;
	}
}