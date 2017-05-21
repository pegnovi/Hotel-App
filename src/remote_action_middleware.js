const actionToApiMapping = {
	'ADD_TO_CART': {
		target: 'serviceInstances',
		method: 'POST'
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
	}
	//else if(apiObj.method === 'GET') {}

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