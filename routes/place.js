const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const PlaceController = require('../controllers/place');


router.get('/latest', PlaceController.getLatest);

router.get('/popular', PlaceController.getPopular);

router.get('/:placeId', PlaceController.getOnePlace);

router.get('/', PlaceController.getAllPlaces);

router.patch('/:placeId', PlaceController.updatePlace);

module.exports = router;