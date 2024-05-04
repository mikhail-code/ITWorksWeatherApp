const accuweatherService = require('../APIs/accuweather');
const mockService = require('../mocks/accuweather');

const getLocationSuggestions = async (req, res) => {
  // http://localhost:5000/weather/searchCity?q=Tel
  const q = req.query.q; //requires "q" param to search
  try {
    const citiesData = await accuweatherService.getLocationSuggestions(q, process.env.ACCUWEATHER_API_KEY);
    res.json(citiesData);
  } catch (error) {
    console.error('Error fetching location suggestions:', error);
    res.status(500).json({ message: 'Failed to retrieve location suggestions' });
  }
};

const getCurrentConditions = async (req, res) => {
  // http://localhost:5000/weather/currentConditions?locationKey=215854
  const locationKey = req.query.locationKey;
  try {
    const currentWeather = await accuweatherService.getCurrentConditions(locationKey, process.env.ACCUWEATHER_API_KEY);
    res.json(currentWeather);
  } catch (error) {
    console.error('Error fetching current conditions:', error);
    res.status(500).json({ message: 'Failed to retrieve current weather data for ' + locationKey });
  }
};

const getHistoricalConditions = async (req, res) => {
  // http://localhost:5000/weather/historicalConditions?locationKey=215854&hoursAgo=24
  const locationKey = req.query.locationKey;
  const hoursAgo = req.query.hoursAgo;
  try {
    const historicalWeather = await accuweatherService.getHistoricalConditions(locationKey, hoursAgo, process.env.ACCUWEATHER_API_KEY);
    res.json(historicalWeather);
  } catch (error) {
    console.error('Error fetching historical conditions:', error);
    res.status(500).json({ message: 'Failed to retrieve historical weather data for ' + locationKey });
  }
};

const getCityDataByLocationKey = async (req, res) => {
  // http://localhost:5000/weather/getCityData?locationKey=215854
  const locationKey = req.query.locationKey;
  try {
    const weatherData = await accuweatherService.getCityDataByLocationKey(locationKey, process.env.ACCUWEATHER_API_KEY);
    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching data for selected city:', error);
    res.status(500).json({ message: 'Failed to retrieve weather data for ' + locationKey });
  }
};

const get12HoursForecast = async (req, res) => {
  // http://localhost:5000/weather/dailyForecast?locationKey=215854
  const locationKey = req.query.locationKey;
  try {
    const dailyWeather = await accuweatherService.get12HoursForecast(locationKey, process.env.ACCUWEATHER_API_KEY);
    res.json(dailyWeather);
  } catch (error) {
    console.error('Error fetching daily forecast:', error);
    res.status(500).json({ message: 'Failed to retrieve daily weather data for ' + locationKey });
  }
};

const get5DaysForecast = async (req, res) => {
  const locationKey = req.query.locationKey;
  try {
    const response = await accuweatherService.get5DaysForecast(locationKey, process.env.ACCUWEATHER_API_KEY);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching 5-day forecast:', error);
    res.status(500).json({ message: 'Failed to retrieve 5-day forecast data' });
  }
};

module.exports = {
  getLocationSuggestions,
  getCityDataByLocationKey,
  getCurrentConditions,
  getHistoricalConditions,
  get12HoursForecast,
  get5DaysForecast,
};