const Poll = require('../models/poll');
const mongoose = require('mongoose');
const axios = require('axios');

exports.getOnePlace = (req, res, next) => {
	const id = req.params.placeId;
	axios.get("https://maps.googleapis.com/maps/api/place/details/json?placeid="+id+"&key=AIzaSyBC2HQHoBkubhbKcsApT9D94AzJ9LmruOM")
			.then(details => {
				//console.log(details.data.result);
				const detail = details.data.result;
				const place = {
					id: id,
					name: detail.name,
					address: detail.vicinity,
					photos: detail.photos ? detail.photos : [{"photo_reference": ""}],
					rating: detail.rating,
					reviews: detail.reviews ? detail.reviews : [{"text": ""}],
					website: detail.website,
					phone: detail.international_phone_number,
					lng: detail.geometry.location.lng,
					lat: detail.geometry.location.lat
				}
				
				res.status(200).json({
					response: 'Fetched place.',
					place
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
				console.log(details.data);
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

exports.getPopular = (req, res, next) => {
	Poll.find({}).sort({votes: -1}).limit(8).select('question options voters posted_on posted_by _id')
	.populate('posted_by')
	.exec()
	.then(polls => {
		res.status(200).json({
			count: polls.length,
			response: 'Fetched polls.',
			polls : polls.map(poll => {
				return {
					id: poll._id,
					question: poll.question,
					options: poll.options,
					posted_by: poll.posted_by.name,
					posted_on: poll.posted_on,
					votes: poll.voters.length,
					voters: poll.voters,
					request: {
						type: 'GET',
						url: 'http://localhost:3000/polls/' + poll.id
					}
				}
			})
		});			
	})
	.catch(err => {
		console.log(err);
		res.status(400).json({
			response: 'No polls yet.'
		});
	})
}

exports.getAllPlaces = (req, res, next) => {
	//const places=[];
	const long = req.query.long;
	const lat = req.query.lat; 
	const type = req.query.type;
	console.log(long, lat);
	axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + long + "&radius=5000&type=" + type + "&key=AIzaSyBC2HQHoBkubhbKcsApT9D94AzJ9LmruOM")
	.then(places => {
		//console.log(places.data.results[0].photos);
		const placeList = places.data.results.map((place) => {
				return {
					id: place.place_id,
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
			response: 'Fetched places.',
			places: placeList
		})
	})
	.catch(err => {
		console.log(err);
	})
	
}
exports.updatePlace = (req, res, next) => {
		res.status(200).json({
			response: 'going'
		});
	
}

