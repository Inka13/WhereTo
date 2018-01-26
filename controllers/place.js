const Poll = require('../models/poll');
const mongoose = require('mongoose');
const axios = require('axios');

exports.getLatest = (req, res, next) => {
	Poll.find({}).sort({posted_on: -1}).limit(8).select('question options voters posted_on posted_by _id')
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
					voters: poll.voters
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

exports.getOnePlace = (req, res, next) => {
	const id = req.params.pollId;
	Poll.findOne({ _id: id}).select('question options voters posted_on posted_by _id')
	.populate('posted_by')
	.exec()
	.then(doc => {
		const poll = {
			id: doc._id,
			question: doc.question,
			options: doc.options,
			posted_by: doc.posted_by.name,
			posted_on: doc.posted_on,
			votes: doc.voters.length,
			voters: doc.voters
		}
		res.status(200).json({
			response: 'Fetched poll.',
			poll
		});	
	})
	.catch(err => {
		console.log(err);
		res.status(404).json({
			response: 'Not found.'
		});
	})
}

exports.getAllPlaces = (req, res, next) => {
	//const places=[];
	axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=45.55111,18.69389&radius=5000&type=bar&key=AIzaSyBC2HQHoBkubhbKcsApT9D94AzJ9LmruOM")
	.then(places => {
		places = places.data.results;
		for(let i=0; i<places.length; i++) {
			//places[i].photos ? console.log(places[i].photos[0]["photo_reference"]) : console.log('empty');
			
			axios.get("https://maps.googleapis.com/maps/api/place/details/json?placeid="+places[i].place_id+"&key=AIzaSyBC2HQHoBkubhbKcsApT9D94AzJ9LmruOM")
			.then(place => {
				places[i].review = place.data.result.reviews ? place.data.result.reviews[0].text : '';
				//console.log(places[i].review);
			});
		
		}
		
		res.status(200).json({
			count: places.length,
			response: 'Fetched places.',
			places : places.map(place => {
				return {
					id: place.place_id,
					name: place.name,
					address: place.vicinity,
					photo: place.photos ? place.photos[0]["photo_reference"] : "",
					rating: place.rating,
					review: place.review ? place.review : ''
				}
			})
		});			
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

