export default store => next => action => {

	console.log('in middleware');

	return next(action);
}