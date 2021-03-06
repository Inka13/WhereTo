const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const PlaceController = require('../controllers/place');


router.get('/all', PlaceController.getAllPlaces);

router.get('/city', PlaceController.getCity);

router.get('/loc/:city', PlaceController.getCityLocation);

router.get('/db/:placeId', PlaceController.getOnePlaceFromDB);

router.get('/:placeId', PlaceController.getOnePlace);

router.patch('/:placeId', PlaceController.updatePlace);

module.exports = router;