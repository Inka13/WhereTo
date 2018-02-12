import axios from 'axios';

export const getAllPlaces = (long, lat, type, token = '') => {
	return(dispatch) => {
		return axios.get("/places/all/", {
			params: {
				long,
				lat,
				type,
				token
			}
		})
			.then((response) => {
				console.log(response.data.city);
				dispatch(gotPlaces(response.data.places, type, response.data.city))
			})
			.catch(function (error) {
    		console.log(error);
  		});
	}
};
export const getCity = (long, lat) => {
	console.log(long, lat);
	return(dispatch) => {
		return axios.get("/places/city/", {
			long,
			lat
		})
			.then((response) => {
				console.log(response.data.city);
				return response.data.city;
			})
			.catch(function (error) {
    		console.log(error);
  		});
	}
};
export const getCityLocation = (city) => {
	return(dispatch) => {
		return axios.get("/places/loc/" + city)
			.then((response) => {
				console.log(response.data.loc);
				dispatch(gotLocation(response.data.loc));
				dispatch(getAllPlaces(response.data.loc.lng, response.data.loc.lat, "bar"));
			})
			.catch(function (error) {
    		console.log(error);
  		});
	}
};
export const gotPlaces = (places, placestype, city) => {
	return {
		type: "GOT_PLACES",
		places,
		city,
		placestype
	};
};
export const showSignupForm = () => {
	return {
		type: "SHOW_FORM",
		form: 'signup'
	};
};
export const showLoginForm = () => {
	return {
		type: "SHOW_FORM",
		form: 'login'
	};
};
export const hideForm = () => {
	return {
		type: "HIDE_FORM"
	};
};
export const submitSignup = (name, email, password) => {
	return(dispatch) => {
		return axios.post("/users/signup", {
        		name,
        		email,
        		password
      		})
			.then((response) => {
				if(response.data.createdUser){
					dispatch(submitLogin(name, password));
				}
			})
			.catch(function (error) {
    		console.log(error);
  		});
	}
};
export const submitLogin = (name, password) => {
	//console.log(name, password);
	return(dispatch) => {
		return axios.post("/users/login", {
    				name: name,
        			password: password
        		}
        )
		.then((response) => {
			if(response.data.token) dispatch(userLogin(response.data));
		}).catch(function (error) {
    		console.log(error);
  		});
	}
};
export const getOnePlace = (id) => {
	return(dispatch) => {
		return axios.get("/places/db/" + id)
			.then((response) => {
				response.data.place ? dispatch(gotOnePlace(response.data.place)) : dispatch(getOnePlaceFromAPI(id));
			}).catch(err => {
				console.log(err);
			})
	}
};
export const getOnePlaceFromAPI = (id) => {
	return(dispatch) => {
		return axios.get("/places/" + id)
			.then((response) => {
				dispatch(gotOnePlace(response.data.place))
			}).catch(err => {
				console.log(err);
			})
	}
}; 
export const gotOnePlace = (place) => {
	//console.log(place);
	return {
		type: "GOT_ONE_PLACE",
		place,
		form: ''
	};
};
export const gotLocation = (loc) => {
	//console.log(loc);
	return {
		type: "GOT_LOCATION",
		loc
	};
};
export const updatePlace = (userId, placeId) => {
	return(dispatch) => {
		console.log(userId , placeId);
		return axios.patch("/places/" + placeId, { 
        		id: userId
      		})
			.then((response) => {
				if(response.data.error) dispatch(alertMe(response.data.error));
				dispatch(getOnePlace(placeId))
			})
			.catch(function (error) {
    		console.log(error);
  		});
	}
};
export const alertMe = () => {
	return {
		type: "NOT_SIGNED_IN",
		form: 'alert'
	};
}
export const userLogin = (data) => {
	return {
		type: "USER_LOGGED_IN",
		user: data.user,
		token: data.token,
		form: ''
	};
};
export const userLogout = () => {
	return {
		type: "USER_LOGGED_OUT"
	};
};