function placestype(state='bar', action) {
	switch(action.type) {
		case 'GOT_PLACES':
			return action.placestype;
		 default:
		 	return state;	
		}
		
}
export default placestype;