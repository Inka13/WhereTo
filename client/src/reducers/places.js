function places(state=[], action) {
	switch(action.type) {
		case 'GOT_PLACES':
			return action.places;
		case 'USER_IS_GOING':
			return [];
		 default:
		 	return state;
		}
}
export default places;