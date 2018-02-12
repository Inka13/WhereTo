const Place = require('../models/place');
const mongoose = require('mongoose');
const axios = require('axios');

exports.getOnePlaceFromDB = (req, res, next) => {
	const id = req.params.placeId;
	Place.findOne({place_id: id}).exec()
			.then(place => {
				//console.log(place);
				res.status(200).json({
					response: 'Fetched place.',
					place
				});	
			})
			.catch(err => {
				console.log(err);
			})
} 
exports.getOnePlace = (req, res, next) => {
	const id = req.params.placeId;
	//console.log(id);
	axios.get("https://maps.googleapis.com/maps/api/place/details/json?placeid="+id+"&key=AIzaSyBC2HQHoBkubhbKcsApT9D94AzJ9LmruOM")
			.then(details => {
				//console.log(details.data.result);
				const detail = details.data.result;
				const place = new Place({
					_id: new mongoose.Types.ObjectId(),
					place_id: id,
					name: detail.name,
					address: detail.vicinity,
					photos: detail.photos ? detail.photos : [{"photo_reference": ""}],
					rating: detail.rating,
					reviews: detail.reviews ? detail.reviews : [{"text": ""}],
					website: detail.website,
					phone: detail.international_phone_number,
					lng: detail.geometry.location.lng,
					lat: detail.geometry.location.lat,
					goers: [],
					going: 0
				});
				place.save().then(result => {		
					const placeA = {
						place_id: id,
						name: detail.name,
						address: detail.vicinity,
						photos: detail.photos ? detail.photos : [{"photo_reference": ""}],
						rating: detail.rating,
						reviews: detail.reviews ? detail.reviews : [{"text": ""}],
						website: detail.website,
						phone: detail.international_phone_number,
						lng: detail.geometry.location.lng,
						lat: detail.geometry.location.lat,
						goers: [],
						going: 0
					};
					res.status(200).json({
						response: 'Fetched place.',
						place: placeA
					});	
			})
			})
			.catch(err => {
				console.log(err);
			})
} 
exports.getCity = (req, res, next) => {
	const long = req.query.long;
	const lat = req.query.lat;
	console.log(long, lat);
	axios.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&sensor=true')
			.then(details => {
				console.log(details.results[0]);
				//const detail = details.data;
				//const city = detail.results;
				
				res.status(200).json({
					response: 'Fetched place.',
					city: 'Zagreb'
				});	
			})
			.catch(err => {
				console.log(err);
			})
} 
	
exports.getCityLocation = (req, res, next) => {
	const city = req.params.city;
	axios.get("http://getcitydetails.geobytes.com/GetCityDetails?fqcn=" + city)
			.then(details => {
				//console.log(details.data);
				const detail = details.data;
				const loc = {
					name: detail.geobytesfqcn,
					lng: detail.geobyteslongitude,
					lat: detail.geobyteslatitude
				}
				
				res.status(200).json({
					response: 'Fetched place.',
					loc
				});	
			})
			.catch(err => {
				console.log(err);
			})
} 

exports.getAllPlaces = (req, res, next) => {
	//const places=[];
	const long = req.query.long;
	const lat = req.query.lat; 
	const type = req.query.type;
	//console.log(long, lat);
	const next_page_token = req.query.token;
	axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + long + "&radius=10000&type=" + type + "&key=AIzaSyBC2HQHoBkubhbKcsApT9D94AzJ9LmruOM" + next_page_token)
	.then(places => {
		//console.log(places.data.results[0].photos);
		//console.log(places.data.next_page_token);
		
		const placeList = places.data.results.map((place) => {

				return {
					place_id: place.place_id,
					icon: place.icon,
					name: place.name,
					address: place.vicinity,
					photos: place.photos ? place.photos : [{"photo_reference": ""}],
					rating: place.rating,
					review: ''
				}
			});
		//console.log(placeList);
		
	res.status(200).json({
			count: placeList.length,
			city: placeList[0].address.split(',')[1],
			pagetoken: places.data.next_page_token,
			response: 'Fetched places.',
			places: placeList
		})
	})
	.catch(err => {
		console.log(err);
	})
	
	//console.log(next_page_token);
	//console.log(placeList);
		
}
exports.updatePlace = (req, res, next) => {
	const id = req.params.placeId;
	let userId = req.body.id;
	let goers = [];
	Place.findOne({place_id: id}).exec()
	.then(place => {
		if(place.goers.indexOf(userId)!==-1) {
			goers = [...place.goers, userId];
			Place.update({ place_id: id }, { $set: {goers: goers}, $inc: {going: -1} })
			.then(result => {
				res.status(200).json({
					place: result,
					response: 'Place updated.',
				})
			})
		} else {
			goers = [...place.goers, userId];
			Place.update({ place_id: id }, { $set: {goers: goers}, $inc: {going: 1} })
			.then(result => {
				res.status(200).json({
					place: result,
					response: 'Place updated.',
				});
			})
		}
	})	
	.catch(err => {
		console.log(err);
		res.status(500).json({
			response: err
		});
	});	
	
}

