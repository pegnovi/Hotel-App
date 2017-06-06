import { find, filter, merge, cloneDeep } from 'lodash';

export function mergeServicesAndInstances(serviceInstances, services, purchased) {

	let merged = serviceInstances.map((serviceInstance) => {
		const targetService = find(services, (o) => o.id === serviceInstance.serviceId);
		if(targetService) {
			let nuDataObj = cloneDeep(targetService);
			nuDataObj.instanceId = serviceInstance.id;
			return merge(nuDataObj, serviceInstance);
		}
		return null;
	});

	return filter(merged, (dataObj) => dataObj.purchased === purchased);
}