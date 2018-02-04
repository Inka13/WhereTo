function city(state='', action) {
	switch(action.type) {
		case 'GOT_PLACES':
			return action.city;
		 default:
		 	return state;	
		}
		
}
export default city;