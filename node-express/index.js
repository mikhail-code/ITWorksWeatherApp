const express = require('express');
const accuweatherRoutes = require('./routes/accuweather');

const app = express();
const port = 5000;
require('dotenv').config();

const useMockService = process.env.TO_MOCK === 'true'; // We need this to excape problems with .env values are string by default 

console.log(useMockService ? 'Using mock AccuWeather service for testing.' : 'Using real AccuWeather service.');
// ... (other middleware setup)

app.use('/weather', accuweatherRoutes(useMockService)); // Pass useMockService flag to routes

// ... (other route definitions)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
