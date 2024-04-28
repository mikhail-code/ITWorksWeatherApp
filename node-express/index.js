const express = require('express');
const accuweatherRoutes = require('./routes/accuweather');

const app = express();
const port = 5000;
require('dotenv').config();

let useMockAccuweather = process.env.TO_MOCK === 'true';

console.log(process.env.TO_MOCK ? 'Using mock AccuWeather service for testing.' : 'Using real AccuWeather service.');

// ... (other middleware setup)

app.use('/weather', accuweatherRoutes(useMockAccuweather)); // Pass useMockAccuweather flag to routes

// ... (other route definitions)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
