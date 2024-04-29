const express = require('express');
const accuweatherController = require('../controllers/accuweather');
const accuweatherService = require('../APIs/accuweather');
const mockService = require('../mocks/accuweather');

module.exports = (useMockService) => {
  const router = express.Router();

  const handleSearchCity = async (req, res) => {
    // ... your existing route logic
    if (useMockService) {
      // Use mock service (e.g., call mockService.getLocationSuggestions(req.query.q))
      const weatherData = mockService.getLocationSuggestions(req.query.q);
      res.json(weatherData);
    } else {
      // Use real AccuWeather service (call accuweatherController functions)
      await accuweatherController.getLocationSuggestions(req, res); // Or relevant function
    }
  };

  router.get('/searchCity', async (req, res) => {
    const query = req.query.q;
    await handleSearchCity(req, res);
  });

  router.get('/getCityData', async (req, res) => {
    const locationKey = req.query.locationKey;
    await handleRequest(req, res);
  });

  return router;
};
