import { getData } from './requestHelper';

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
			console.log(services);
			dispatch(setServices(services));
		})
		.catch((error) => {
			throw error;
		})
	}
}