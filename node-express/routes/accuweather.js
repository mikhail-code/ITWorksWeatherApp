const express = require('express');
const accuweatherController = require('../controllers/accuweather');
const accuweatherService = require('../APIs/accuweather');
const mockService = require('../mocks/accuweather');

module.exports = (useMockService) => {
  const router = express.Router();

  // Structure below doesnt seems like a perfect way to do this, because we need to write route and handler for each function
  // but it allows us easily switch real API with mocks

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

  const handleGetCityData = async (req, res) => {
    if (useMockService) {
      const weatherData = mockService.getLocationSuggestions(req.query.q);
      res.json(weatherData);
    } else {
      // Use real AccuWeather service (call accuweatherController functions)
      await accuweatherController.getCityDataByLocationKey(req, res); // Or relevant function
    }
  };

  router.get('/searchCity', async (req, res) => {
    // http://localhost:5000/weather/searchCity?q=Tel
    await handleSearchCity(req, res);
  });

  router.get('/getCityData', async (req, res) => {
    // http://localhost:5000/weather/getCityData?locationKey=123
    await handleGetCityData(req, res);
  });

  return router;
};
