function longlat(state=[], action) {
	switch(action.type) {
		case 'GOT_LONGLAT':
			return action.longlat;
		 default:
		 	return state;	
		}
		
}
export default longlat;