import {combineReducers} from 'redux';
import UserReducer from './users';
import PlacesReducer from './places';
import ActivePlaceReducer from './activePlace'
import FormReducer from './form';
import TokenReducer from './token';
import TypeReducer from './placestype';
import LongLatReducer from './longlat';
import CityReducer from './city';

const reducers = combineReducers({
	user: UserReducer,
	places: PlacesReducer,
	longlat: LongLatReducer,
	activePlace: ActivePlaceReducer,
	form: FormReducer,
	token: TokenReducer,
	placestype: TypeReducer,
	city: CityReducer
});

export default reducers;