import React from "react";
import { CgAdd } from "react-icons/cg";

const ChosenCityPanel = ({ selectedCity }) => {
  // data is passed as a prop (selectedCity)
  

  return (
    <div className="flex shadow-lg text-gray-800 h-200">
    {selectedCity ? (
      <div className="panel grid grid-cols-3 gap-4">
        {/* Left Side */}
        <div className="left-side flex flex-col p-4 justify-center items-center">
          <h1 className="city-name text-3xl font-bold text-gray-800">
            {selectedCity.LocalizedName}
          </h1>
          <p className="city-temp text-lg text-gray-600">11</p>
        </div>

        {/* Right Side */}
        <div className="right-side grid grid-rows-2 gap-4">
          {/* Add to Favorites */}
          <div className="add-favorite flex items-center justify-center p-4">
            <CgAdd className="text-4xl text-gray-500" />
            <p className="text-lg font-bold ml-2">Add City to Favorites</p>
          </div>

          {/* Weather Grid */}
          <div className="weather-grid grid grid-cols-7 gap-2">
            {/* Day Weather */}
            <div className="day-weather flex flex-col items-center justify-center p-2">
              <span className="material-icons text-xl text-gray-500">
                sunny
              </span>
              <p className="text-xs text-gray-600">Mon</p>
            </div>
            {/* Repeat for other days (update with actual weather data from API) */}
          </div>
        </div>
      </div>
      ) : ( // Render message if no city is selected
        <div>No city selected yet.</div>
      )}
    </div>
  );
};

export default ChosenCityPanel;
