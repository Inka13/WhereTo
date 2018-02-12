const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const placeSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	place_id: { type: String },
	name: { type: String },
	address: { type: String },
	photos: [{}],
	rating: { type: String },
	reviews: [{}],
	website: { type: String },
	phone: { type: String },
	lng: { type: Number },
	lat: { type: Number },
	goers: [ { type: String } ],
	going: { type: Number }
});

module.exports = mongoose.model('Place', placeSchema);
