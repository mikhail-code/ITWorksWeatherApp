import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming axios is installed for making API requests
import FavoriteBubble from './FavoriteBubble'; // Assuming FavoriteBubble is in a separate file

const FavoritesBar = ({ selectedCity }) => {
  const [favorites, setFavorites] = useState([]);
  const [weatherData, setWeatherData] = useState({}); // Object to store weather data for all favorite cities
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load favorites from local storage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites);
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error('Error parsing favorites from local storage:', error);
      }
    }
  }, []);

  // Update favorites in local storage on changes to the state
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (selectedCity === null) { // Check for strict equality with null
      console.log("selectedCity is null");
    } else {
      console.log("selectedCity:", selectedCity); // Log the object if not null
    }
  }, [selectedCity]);
  

  // Function to handle adding a favorite city
  const handleAddFavorite = (city) => {
    if (!city) {
      setFavorites([...favorites, selectedCity]); // Add selectedCity if empty
      console.log("favorites:" + favorites)
    } else {
      console.log("notuing:")
      return
    }
  };

  // Function to handle removing a favorite city
  const handleRemoveFavorite = (city) => {
    const updatedFavorites = favorites.filter((favoriteCity) => favoriteCity.cityKey !== city.cityKey);
    setFavorites(updatedFavorites);
  };

  // Function to fetch weather data for all favorite cities
  const fetchWeatherData = async () => {
    setIsLoading(true);
    setError(null); // Clear any previous errors

    try {
      const weatherDataPromises = favorites.map(async (city) => {
        const response = await axios.get(`/api/weather/currentConditions?locationKey=${city.cityKey}`);
        return response.data[0]; // Assuming the API response structure
      });

      const resolvedWeatherData = await Promise.all(weatherDataPromises);
      setWeatherData(Object.assign({}, ...resolvedWeatherData)); // Combine weather data into a single object
    } catch (error) {
      setError(error);
      console.error('Error fetching weather data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to format temperature string (optional)
  const formatTemperature = (temperature) => {
    if (temperature && temperature.Metric) {
      return `${temperature.Value} ${temperature.Metric.Unit}`;
    }
    return 'N/A'; // Handle cases where temperature data is missing
  };

  useEffect(() => {
    if (favorites.length > 0) {
      fetchWeatherData();
    }
  }, [favorites]); // Fetch weather data whenever favorites list changes

  return (
    <div className="flex flex-row justify-center gap-2 text-white fixed-width-784">
    {favorites.map((city) => (
      <i>
        <FavoriteBubble
          key={city.cityKey}
          city={city}
          onRemoveFavorite={handleRemoveFavorite}
          handleAddFavorite={handleAddFavorite}
        />
      </i>
    ))}
      {/* Render empty bubbles to fill up to 5 */}
      {Array(Math.max(0, 5 - favorites.length)).fill(null).map((_, index) => (
        <i>
          <FavoriteBubble
            key={`empty-${index}`} // Unique key for empty bubbles
            handleAddFavorite={handleAddFavorite}
          />
        </i>
      ))}
    </div>
  );
};

export default FavoritesBar;
