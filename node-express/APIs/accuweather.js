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

async function getCityDataByLocationKey(query, apiKey) {
  // http://dataservice.accuweather.com/locations/v1/
  // /locations/v1/215854?apikey=TpBdfny5Gaf9ZG2Z9rWXGiy9a7YgO7oK
  const url = `${baseUrl}locations/v1/${query}?apikey=${apiKey}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data by location key:', error);
    return [];
  }
}

module.exports = {
  getLocationSuggestions, getCityDataByLocationKey
};