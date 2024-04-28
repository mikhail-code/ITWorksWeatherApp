const accuweatherService = require('../APIs/accuweather');
const mockService = require('../mocks/accuweather');

const getLocationSuggestions = async (req, res, useMockService = false) => {
  const query = req.query.q; // Assuming query parameter is named 'q'

  if (useMockService) {
    const weatherData = mockService.getLocationSuggestions(query); // Use mock service
    res.json(weatherData);
  } else {
    try {
      const weatherData = await accuweatherService.getLocationSuggestions(query, process.env.ACCUWEATHER_API_KEY);
      res.json(weatherData);
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
      res.status(500).json({ message: 'Failed to retrieve location suggestions' });
    }
  }
};

const getCityDataByLocationKey = async (req, res, useMockService = false) => {
  // Implement logic to fetch city data by locationKey using AccuWeather API
  // ... (replace with your implementation)
  // You can also add a conditional check here based on useMockService
  // to potentially return mock data if necessary
};

module.exports = {
  getLocationSuggestions,
  getCityDataByLocationKey,
};
