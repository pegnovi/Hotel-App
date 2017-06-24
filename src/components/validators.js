import moment from 'moment';

export const required = value => (value ? undefined : 'Required');
export const validDate = (value) => {
	if(value) {
		if(moment.isMoment(value)) {
			if(value.isValid()) {
				return undefined;
			}
		}
	}
	return 'Invalid Date';
}