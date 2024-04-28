const express = require('express');
const accuweatherController = require('../controllers/accuweather');

const router = express.Router();

router.get('/searchCity', accuweatherController.getLocationSuggestions);
router.get('/getCityData', accuweatherController.getCityDataByLocationKey);

module.exports = router;
