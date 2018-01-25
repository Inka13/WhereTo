import {combineReducers} from 'redux';
import UserReducer from './users';
import PlacesReducer from './places';
import ActivePlaceReducer from './activePlace'
import FormReducer from './form';
import TokenReducer from './token';


const reducers = combineReducers({
	user: UserReducer,
	places: PlacesReducer,
	activePlace: ActivePlaceReducer,
	form: FormReducer,
	token: TokenReducer
});

export default reducers;