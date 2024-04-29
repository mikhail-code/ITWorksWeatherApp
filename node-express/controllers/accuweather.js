const accuweatherService = require('../APIs/accuweather');
const mockService = require('../mocks/accuweather');

const getLocationSuggestions = async (req, res) => {
  const query = req.query.q;
  try {
    const weatherData = await accuweatherService.getLocationSuggestions(query, process.env.ACCUWEATHER_API_KEY);
    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching location suggestions:', error);
    res.status(500).json({ message: 'Failed to retrieve location suggestions' });
  }
};

const getCityDataByLocationKey = async (req, res) => {
  // Implement logic to fetch city data by locationKey using AccuWeather API
  // ... (replace with your implementation)

  // Conditional check for mock service can be implemented here as well
  // (based on route configuration or environment variables)
};

module.exports = {
  getLocationSuggestions,
  getCityDataByLocationKey,
};
