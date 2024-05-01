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

module.exports = {
  getLocationSuggestions,
  getCityDataByLocationKey,
};
