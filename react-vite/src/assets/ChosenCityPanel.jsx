import React from "react";
import { CgAdd } from "react-icons/cg";
const myCity = {
    fullName: "Tel Aviv",
    code: "TLV",
    temp: "+31",
    img: "assets/img/tlv.jpeg",
  };
const ChosenCityPanel = ({ city = myCity }) => {
  // Assuming city data is passed as a prop

  return (
    <div className="flex shadow-lg text-gray-800 h-200">
     <div className="panel grid grid-cols-3 gap-4">
        {/* Left Side */}
        <div className="left-side flex flex-col p-4 justify-center items-center">
          <h1 className="city-name text-3xl font-bold text-gray-800">
            {city.fullName}
          </h1>
          <p className="city-temp text-lg text-gray-600">{city.temp}</p>
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
            {/* Repeat for other days */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChosenCityPanel;
