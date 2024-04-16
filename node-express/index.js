const express = require('express');
const app = express();
const port = 5000;
require('dotenv').config();

let useMockAccuweather = false;

const accuweatherApiKey = process.env.ACCUWEATHER_API_KEY;
const accuweatherService = require('./APIs/accuweather');



if (process.env.TO_MOCK === 'true') {
  useMockAccuweather = true;
  console.log('Using mock AccuWeather service for testing.');
}

// Function to conditionally use real or mock AccuWeather service
async function getLocationSuggestions(query) {
  if (useMockAccuweather) {
    const mockAccuweather = require('./__mocks__/accuweather');
    return mockAccuweather.getLocationSuggestions(query);
  } else {
    // Use real AccuWeather service
    return accuweatherService.getLocationSuggestions(query, accuweatherApiKey);
  }
}

// Route to handle weather data requests
app.get('/searchCity', async (req, res) => {
  const query = req.query.q; // Assuming query parameter is named 'q'

  try {
    const weatherData = await getLocationSuggestions(query);
    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ message: 'Failed to retrieve weather data' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
