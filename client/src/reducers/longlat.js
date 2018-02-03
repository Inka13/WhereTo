function longlat(state=[], action) {
	switch(action.type) {
		case 'GOT_LOCATION':
			return [action.loc.lng, action.loc.lat];
		 default:
		 	return state;	
		}
		
}
export default longlat;