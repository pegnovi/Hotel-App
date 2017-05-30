// Keep reducer as simple as possible
// Reducer is only for updating client-side state

import { Map, List, fromJS } from 'immutable';

function setState(state, action) {
	return state.merge(action.state);
}


export default function(state = fromJS({services: [], cart: []}), action) {
	switch(action.type) {
		case 'SET_STATE':
			return setState(state, action);
		default:
			return state;
	}
}
