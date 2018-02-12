function form(state='', action) {
	switch(action.type) {
		case 'SHOW_FORM':
			return action.form; 	
		case 'USER_LOGGED_IN':
			return action.form; 
		case 'HIDE_FORM':
			return '';
		case 'GOT_PLACES':
			return '';
		case 'NOT_SIGNED_IN':
			return 'alert';
		 default:
		 	return state;	
		}
}
export default form;