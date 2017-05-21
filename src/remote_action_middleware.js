import 'whatwg-fetch'; //fetch

const actionToApiMapping = {
	'ADD_TO_CART': {
		target: 'serviceInstances',
		method: 'POST'
	},
	'REMOVE_FROM_CART': {
		target: 'serviceInstances',
		method: 'DELETE'
	}
};

export default store => next => action => {

	console.log('in middleware');
	console.log(action);

	const apiObj = actionToApiMapping[action.type]
	if(apiObj) {
		if(apiObj.method === 'POST') {
			postData(apiObj.target, action.data);
		}
		else if(apiObj.method === 'DELETE') {
			removeData(apiObj.target, action.data);
		}
	}
	//else if(apiObj.method === 'GET') {}

	return next(action);
}

function createOptions(method, data) {
	let options = {
		method: method,
		headers: { 'Content-Type': 'application/json' }
	};
	if(data) {
		options.body = JSON.stringify(data);
	}
	return options;
}

function removeData(targetApi, data) {
	const options = createOptions('DELETE', data);
	fetch(`/api/${targetApi}`, options)
	.then(() => {
		//let updatedTodos = this.state.todos.map(item => item);
		//updatedTodos.push(todo);
		//this.setState({ todos: updatedTodos });
		console.log('data removed');
	})
	.catch((error) => {
		throw error;
	});
}

function postData(targetApi, data) {
	const options = createOptions('POST', data);
	fetch(`/api/${targetApi}`, options)
	.then(() => {
		//let updatedTodos = this.state.todos.map(item => item);
		//updatedTodos.push(todo);
		//this.setState({ todos: updatedTodos });
		console.log('data saved');
	})
	.catch((error) => {
		throw error;
	});
}