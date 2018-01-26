function activePlace(state={}, action) {
	switch(action.type) {
		case 'GOT_ONE_PLACE':
			return action.place;
		case 'GOT_PLACES':
			return {};
		case 'USER_VOTED':
			return {};
		default:
		 	return state;	
	}
}
export default activePlace;