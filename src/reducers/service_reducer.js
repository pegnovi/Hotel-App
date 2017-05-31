import { Map, List, fromJS, toJS } from 'immutable';

function setServices(state, action) {
	console.log(action);
	console.log(state.toJS());
	const nextState = state.merge(fromJS(action.data));
	console.log(nextState.toJS());
	return nextState;
}

export default function(state = fromJS([]), action) {
	switch(action.type) {
		case 'SET_SERVICES':
			return setServices(state, action);
		default:
			return state;
	}
}