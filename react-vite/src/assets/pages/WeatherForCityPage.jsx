// WeatherForCityPage.jsx
import React, { useState } from 'react';
import FavoritesBar from '../FavoritesBar';
import ChosenCityPanel from '../ChosenCityPanel';
import SearchBar from '../SearchBar';

function WeatherForCityPage() {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCitySelected = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="min-h-screen flex flex-col justify-start items-center">
      <FavoritesBar />
      <ChosenCityPanel selectedCity={selectedCity} />
      <SearchBar onCitySelected={handleCitySelected} />
    </div>
  );
}

export default WeatherForCityPage;
