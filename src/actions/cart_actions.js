import { getData, postData, updateData, removeData } from './requestHelper';

export function removePurchasedServiceInstancesFromCart(serviceInstances) {
	return {
		type: 'REMOVE_SERVICE_INSTANCES',
		data: serviceInstances
	};
}

export function buyServices(serviceInstances) {
	// return (dispatch) => {
	// 	updateData('orders', serviceInstances)
	// 	.then((response) => {
	// 		console.log(response);
	// 		// Dispatch action that adds serviceInstances to orders array

	// 		dispatch(removePurchasedServiceInstancesFromCart(serviceInstances));
	// 	})
	// }
	// ^^ uncomment later when adding serviceInstances to orders array is tested
	return removePurchasedServiceInstancesFromCart(serviceInstances);
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

