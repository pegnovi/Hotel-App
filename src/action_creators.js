export function setState(state) {
	return {
		type: 'SET_STATE',
		state
	};
}



export function removeFromCart(data) {
	console.log(data);
	removeData('serviceInstances', data)
	.catch((error) => {
		throw error;
	});

	return {
		type: 'REMOVE_FROM_CART',
		data
	};
}

export function setToCart(serviceInstance) {
	return {
		type: 'SET_TO_CART',
		data: serviceInstance
	};
}
export function addToCart(serviceInstance) {
	return (dispatch) => {
		postData('serviceInstances', serviceInstance)
		.then((responseObj) => {
			serviceInstance.id = responseObj.id;
			dispatch(setToCart(serviceInstance));
		});
	}
}

export function setServices(services) {
	return {
		type: 'SET_SERVICES',
		data: services
	};
}
export function getServices() {
	return (dispatch) => {
		getData('services')
		.then((services) => {
			dispatch(setServices(services));
		})
		.catch((error) => {
			throw error;
		})
	}
}


export function setServiceInstances(serviceInstances) {
	return {
		type: 'SET_SERVICE_INSTANCES',
		data: serviceInstances
	};
}
export function getServiceInstances() {
	return (dispatch) => {
		getData('serviceInstances')
		.then((serviceInstances) => {
			dispatch(setServiceInstances(serviceInstances));
		})
		.catch((error) => {
			throw error;
		})
	}
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

function getData(targetApi) {
	const options = createOptions('GET');
	return fetch(`/api/${targetApi}`, options)
	.then((response) => response.json());
}

function removeData(targetApi, data) {
	const options = createOptions('DELETE', data);
	return fetch(`/api/${targetApi}`, options);
}

function postData(targetApi, data) {
	const options = createOptions('POST', data);
	return fetch(`/api/${targetApi}`, options)
	.then((response) => response.json());
}