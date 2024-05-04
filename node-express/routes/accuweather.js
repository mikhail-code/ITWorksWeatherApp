const express = require('express');
const accuweatherController = require('../controllers/accuweather');
const accuweatherService = require('../APIs/accuweather');
const mockService = require('../mocks/accuweather');

module.exports = (useMockService) => {
  const router = express.Router();

  // Structure below doesnt seems like a perfect way to do this, because we need to write route and handler for each function
  // but it allows us easily switch real API with mocks

  const handleSearchCity = async (req, res) => {
    if (useMockService) {
      // Use mock service (e.g., call mockService.getLocationSuggestions(req.query.q))
      const weatherData = mockService.getLocationSuggestions(req.query.q);
      res.json(weatherData);
    } else {
      // Use real AccuWeather service (call accuweatherController functions)
      await accuweatherController.getLocationSuggestions(req, res); // Or relevant function
    }
  };

  const handleCurrentConditions = async (req, res) => {
    if (useMockService) {
      // http://localhost:5000/weather/currentConditions?locationKey=215854
      const weatherData = mockService.getCurrentConditions(req.query.locationKey);
      res.json(weatherData);
    } else {
      // Use real AccuWeather service
      const locationKey = req.query.locationKey;
      if (locationKey) {
        await accuweatherController.getCurrentConditions(req, res);
      } else {
        res.status(400).json({ message: 'Missing required parameter: locationKey' });
      }
    }
  };

  const handleHistoricalConditions = async (req, res) => {
    if (useMockService) {
      // http://localhost:5000/weather/historicalConditions?locationKey=215854&hoursAgo=24
      const weatherData = mockService.getHistoricalConditions(req.query.locationKey, req.query.hoursAgo);
      res.json(weatherData);
    } else {
      // Use real AccuWeather service
      const locationKey = req.query.locationKey;
      const hoursAgo = req.query.hoursAgo;
      if (locationKey && hoursAgo) {
        await accuweatherController.getHistoricalConditions(req, res);
      } else {
        const errorMessage = [];
        if (!locationKey) {
          errorMessage.push('Missing required parameter: locationKey');
        }
        if (!hoursAgo) {
          errorMessage.push('Missing required parameter: hoursAgo');
        }
        res.status(400).json({ message: errorMessage.join(', ') });
      }
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

  const handleGet12HoursForecast = async (req, res) => {
    if (useMockService) {
      const weatherData = mockService.get12HoursForecast(req.query.q);
      res.json(weatherData);
    } else {
      // Use real AccuWeather service (call accuweatherController functions)
      await accuweatherController.get12HoursForecast(req, res); // Or relevant function
    }
  };

  const handleGet5DaysForecast = async (req, res) => {
    if (useMockService) {
      const weatherData = mockService.get5DaysForecast(req.query.q);
      res.json(weatherData);
    } else {
      // Use real AccuWeather service
      const locationKey = req.query.locationKey;
      if (locationKey) {
        try {
          const response = await accuweatherService.get5DaysForecast(locationKey);
          res.json(response.data);
        } catch (error) {
          console.error('Error fetching 5-day forecast:', error);
          res.status(500).json({ message: 'Failed to retrieve 5-day forecast data' });
        }
      } else {
        res.status(400).json({ message: 'Missing required parameter: locationKey' });
      }
    }
  };

  router.get('/searchCity', async (req, res) => {
    // http://localhost:5000/weather/searchCity?q=Tel
    await handleSearchCity(req, res);
  });

  router.get('/currentConditions', async (req, res) => {
    // http://localhost:5000/weather/currentConditions?locationKey=215854
    await handleCurrentConditions(req, res);
  });

  router.get('/historicalConditions', async (req, res) => {
    // http://localhost:5000/weather/historicalConditions?locationKey=215854&hoursAgo=24
    await handleHistoricalConditions(req, res);
  });

  router.get('/getCityData', async (req, res) => {
    // http://localhost:5000/weather/getCityData?locationKey=123
    await handleGetCityData(req, res);
  });

  router.get('/get12HoursForecast', async (req, res) => {
    // http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/215854
    await handleGet12HoursForecast(req, res);
  });

  router.get('/get5DaysForecast', async (req, res) => {
    // http://localhost:5000/weather/get5DaysForecast?locationKey=215854
    await handleGet5DaysForecast(req, res);
  });

  return router;
};
