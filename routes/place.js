const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const PlaceController = require('../controllers/place');

router.get('/popular', PlaceController.getPopular);

router.get('/all', PlaceController.getAllPlaces);

router.get('/:placeId', PlaceController.getOnePlace);


router.patch('/:placeId', PlaceController.updatePlace);

module.exports = router;