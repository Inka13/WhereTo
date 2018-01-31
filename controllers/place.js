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
					id: detail.place_id,
					name: detail.name,
					address: detail.vicinity,
					photo: detail.photos ? detail.photos[0]["photo_reference"] : "",
					rating: detail.rating,
					review: detail.reviews ? detail.reviews[0].text : '',
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
	axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=45.55111,18.69389&radius=5000&type=bar&key=AIzaSyBC2HQHoBkubhbKcsApT9D94AzJ9LmruOM")
	.then(places => {
		const placeList = places.data.results.map((place) => {
				return {
					id: place.place_id,
					name: place.name,
					address: place.vicinity,
					photo: place.photos ? place.photos[0]["photo_reference"] : "",
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
		/*
		res.status(200).json({
			count: places.length,
			response: 'Fetched places.',
			places : places.data.results.map((place) => {
				return {
					id: place.place_id,
					name: place.name,
					address: place.vicinity,
					photo: place.photos ? place.photos[0]["photo_reference"] : "",
					rating: place.rating,
					review: ''
				}
			})
		})
		*/		
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

