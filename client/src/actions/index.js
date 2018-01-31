import axios from 'axios';

export const getAllPlaces = () => {
	return(dispatch) => {
		return axios.get("/places")
			.then((response) => {
				dispatch(gotPlaces(response.data.places))
			})
			.catch(function (error) {
    		console.log(error);
  		});
	}
};

export const getPopular = () => {
	return(dispatch) => {
		return axios.get("/places/popular")
			.then((response) => {
				dispatch(gotPlaces(response.data.polls))
			})
			.catch(function (error) {
    		console.log(error);
  		});
	}
};
export const gotPlaces = (places) => {
	return {
		type: "GOT_PLACES",
		places
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
		return axios.get("/places/" + id)
			.then((response) => {
				dispatch(gotOnePlace(response.data.place))
			}).catch(err => {
				console.log(err);
			})
	}
};

export const gotOnePlace = (place) => {
	console.log(place);
	return {
		type: "GOT_ONE_PLACE",
		place,
		form: ''
	};
};
export const updatePlace = (userId, placeId) => {
	return(dispatch) => {
		console.log(userId , placeId);
		return axios.patch("/places/" + placeId, { 
        		id: userId
      		})
			.then((response) => {
				dispatch(userVoted());
				dispatch(getOnePlace(placeId))
			})
			.catch(function (error) {
    		console.log(error);
  		});
	}
};
export const userVoted = () => {
	return {
		type: "USER_VOTED"
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