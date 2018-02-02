import {combineReducers} from 'redux';
import UserReducer from './users';
import PlacesReducer from './places';
import ActivePlaceReducer from './activePlace'
import FormReducer from './form';
import TokenReducer from './token';
//import LongLatReducer from './longlat';

const reducers = combineReducers({
	user: UserReducer,
	places: PlacesReducer,
	//longLat: LongLatReducer,
	activePlace: ActivePlaceReducer,
	form: FormReducer,
	token: TokenReducer
});

export default reducers;