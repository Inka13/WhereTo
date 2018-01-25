import axios from 'axios';

export const getAllPlaces = () => {
	return(dispatch) => {
		return axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=AIzaSyBJPEGL_qaEUYuoeTQzPPP6Q55WZAXkXaQ")
			.then((response) => {
				dispatch(gotPlaces(response.data.places))
			})
	}
};
export const getLatest = () => {
	return(dispatch) => {
		return axios.get("/polls/latest")
			.then((response) => {
				dispatch(gotPolls(response.data.polls))
			})
	}
};
export const getPopular = () => {
	return(dispatch) => {
		return axios.get("/polls/popular")
			.then((response) => {
				dispatch(gotPolls(response.data.polls))
			})
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
		return axios.get("/polls/" + id)
			.then((response) => {
				dispatch(gotOnePoll(response.data.poll))
			}).catch(err => {
				console.log(err);
			})
	}
};
export const gotOnePlace = (poll) => {
	console.log(poll);
	return {
		type: "GOT_ONE_PLACE",
		poll,
		form: ''
	};
};
export const updatePlace = (userId, pollId, options) => {
	return(dispatch) => {
		console.log(userId , pollId, options);
		return axios.patch("/polls/" + pollId, { 
        		id: userId,
        		options
      		})
			.then((response) => {
				console.log(pollId);
				if(response.data.error) dispatch(alertMe(response.data.error));
				dispatch(userVoted());
				dispatch(getOnePoll(pollId))
			})
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