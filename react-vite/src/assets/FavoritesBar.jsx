import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming axios is installed for making API requests
import FavoriteBubble from "./FavoriteBubble"; // Assuming FavoriteBubble is in a separate file

const FavoritesBar = ({ selectedCity, isDarkMode, onCitySelected}) => {
  const [favorites, setFavorites] = useState([]);
  const [weatherData, setWeatherData] = useState({}); // Object to store weather data for all favorite cities
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load favorites from local storage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites);
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error("Error parsing favorites from local storage:", error);
      }
    }
  }, []);

  // Update favorites in local storage on changes to the state
  useEffect(() => {
    clearFavorites();
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const clearFavorites = () => {
    localStorage.removeItem("favorites");
    setFavorites([]); // Update state to reflect cleared favorites
  };

  useEffect(() => {
    if (selectedCity === null) {
      // Check for strict equality with null
      console.log("selectedCity is null");
    } else {
      console.log("selectedCity:", selectedCity); // Log the object if not null
    }
  }, [selectedCity]);

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => setError(null), 3000); // Clear error after 3 seconds
      return () => clearTimeout(timeoutId); // Cleanup function to prevent memory leaks
    }
  }, [error]); // Run useEffect only when error changes

  // Function to handle adding a favorite city
  const handleAddFavorite = () => {
    if (!selectedCity) {
      setError("Please select a city to pin");
      return;
    }
    const isFavorite = favorites.some(
      (favCity) => favCity.Key === selectedCity.Key
    ); // Check for existing favorite

    if (!isFavorite) {
      setFavorites([...favorites, selectedCity]); // Add selectedCity if not already a favorite
    } else {
      setError("This city is already pinned"); // Set error message when duplicate
    }
  };

  // Function to handle removing a favorite city
  const handleRemoveFavorite = (cityToRemove) => {
    console.log("cityToRemove " + cityToRemove.Key)
    const updatedFavorites = favorites.filter(
      (favoriteCity) => favoriteCity.Key !== cityToRemove.Key
    );
    setFavorites(updatedFavorites);
  };
  

  // Function to fetch weather data for all favorite cities
  const fetchWeatherData = async () => {
    setIsLoading(true);
    setError(null); // Clear any previous errors

    try {
      const weatherDataPromises = favorites.map(async (city) => {
        const response = await axios.get(
          `/api/weather/currentConditions?locationKey=${city.cityKey}`
        );
        return response.data[0]; // Assuming the API response structure
      });

      const resolvedWeatherData = await Promise.all(weatherDataPromises);
      setWeatherData(Object.assign({}, ...resolvedWeatherData)); // Combine weather data into a single object
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (favorites.length > 0) {
      fetchWeatherData();
    }
  }, [favorites]); // Fetch weather data whenever favorites list changes

  return (
    <div className="flex flex-row justify-center gap-2 text-white fixed-width-784">
      {" "}
      {/* Render filled bubbles using FavoriteBubble with city data from favorites */}
      {favorites.map((city) => (
        <i>
          <FavoriteBubble
            city={city}
            handleRemoveFavorite={handleRemoveFavorite}
            onCitySelected={onCitySelected} // Pass handleAddFavorite prop for all bubbles
            isDarkMode={isDarkMode}
          />
        </i>
      ))}
      {/* Render empty bubbles to fill up to 5 */}
      {Array(Math.max(0, 5 - favorites.length))
        .fill(null)
        .map((_, index) => (
          <i>
            <FavoriteBubble
              key={`empty-${index}`} // Unique key for empty bubbles
              handleAddFavorite={handleAddFavorite} // Pass handleAddFavorite prop for all bubbles
              isDarkMode={isDarkMode}
            />
          </i>
        ))}
      {error && ( // Conditionally render error message if present
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
};

export default FavoritesBar;
