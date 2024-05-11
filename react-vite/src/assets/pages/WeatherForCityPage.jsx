import React, { useState } from 'react';
import FavoritesBar from '../FavoritesBar';
import ChosenCityPanel from '../ChosenCityPanel';
import SearchBar from '../SearchBar';
import DarkModeToggle from '../DarkModeToggle';

function WeatherForCityPage() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // Initialize isDarkMode state

  const handleCitySelected = (city) => {
    setSelectedCity(city);
  };
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-start items-center px-4 flex-grow ${
        isDarkMode ? 'dark:bg-black bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-white'
      }`}
    >
      <FavoritesBar />
      <ChosenCityPanel isDarkMode={isDarkMode} selectedCity={selectedCity} />
      <SearchBar isDarkMode={isDarkMode} onCitySelected={handleCitySelected} />
      <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />  {/* Pass toggleDarkMode function */}
    </div>
  );
}


export default WeatherForCityPage;
