export function createOptions(method, data) {
	let options = {
		method: method,
		headers: { 'Content-Type': 'application/json' }
	};
	if(data) {
		options.body = JSON.stringify(data);
	}
	return options;
}

export function getData(targetApi) {
	const options = createOptions('GET');
	return fetch(`/api/${targetApi}`, options)
	.then((response) => response.json());
}

export function removeData(targetApi, data) {
	const options = createOptions('DELETE', data);
	return fetch(`/api/${targetApi}`, options);
}

export function postData(targetApi, data) {
	const options = createOptions('POST', data);
	return fetch(`/api/${targetApi}`, options)
	.then((response) => response.json());
}