import { find, filter, merge, cloneDeep } from 'lodash';

export function mergeCartAndServices(cart, services, purchased) {

	let merged = cart.map((dataObj) => {
		const targetService = find(services, (o) => o.id === dataObj.serviceId);
		if(targetService) {
			let nuDataObj = cloneDeep(targetService);
			nuDataObj.instanceId = dataObj.id;
			return merge(nuDataObj, dataObj);
		}
		return null;
	});

	return filter(merged, (dataObj) => dataObj.purchased === purchased);
}