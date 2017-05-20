const actionToApiMapping = {
	'ADD_TO_CART': 'serviceInstances'
};

export default store => next => action => {

	console.log('in middleware');
	console.log(action);

	if(action.remote) {
		if(action.remote.method === 'POST') {
			console.log('POST');
			postData(actionToApiMapping[action.type], action.data)
		}
		else if(action.remote.method === 'GET') {
			console.log('GET');
		}
	}

	return next(action);
}

function postData(targetApi, data) {
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	};
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