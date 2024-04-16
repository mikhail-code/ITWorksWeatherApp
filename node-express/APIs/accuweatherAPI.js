async function getLocationSuggestions(query) {
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
  
  module.exports = {
    getLocationSuggestions,
  };