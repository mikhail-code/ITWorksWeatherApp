const axios = require('axios');
const baseUrl = 'http://dataservice.accuweather.com/';

async function getLocationSuggestions(query, apiKey) {
  const url = `${baseUrl}locations/v1/cities/autocomplete?apikey=${apiKey}&q=${query}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching location suggestions:', error);
    // Handle errors appropriately, e.g., return an empty array or throw a custom error
    return [];
  }
}

async function getCurrentConditions(locationKey, apiKey) {
  const url = `${baseUrl}currentconditions/v1/${locationKey}?apikey=${apiKey}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching current conditions:', error);
    return [];
  }
}

async function getHistoricalConditions(locationKey, hoursAgo, apiKey) {
  const url = `${baseUrl}currentconditions/v1/${locationKey}/historical/${hoursAgo}?apikey=${apiKey}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching historical conditions:', error);
    return [];
  }
}

async function getCityDataByLocationKey(query, apiKey) {
  // http://dataservice.accuweather.com/locations/v1/
  // /locations/v1/215854?apikey=blabla
  // THIS ONE Doesnt needed
  const url = `${baseUrl}locations/v1/${query}?apikey=${apiKey}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data by location key:', error);
    return [];
  }
}

async function get12HoursForecast(locationKey, apiKey) {
  // http://localhost:5000/weather/get12HoursForecast?locationKey=215854
  const url = `${baseUrl}forecasts/v1/hourly/12hour/${locationKey}?apikey=${apiKey}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching 12-hour forecast:', error);
    return [];
  }
}

async function get5DaysForecast(locationKey, apiKey) {
  const url = `${baseUrl}forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching 5-day forecast:', error);
    return [];
  }
}

module.exports = {
  getLocationSuggestions,
  getCurrentConditions,
  getHistoricalConditions,
  getCityDataByLocationKey,
  get12HoursForecast,
  get5DaysForecast
};