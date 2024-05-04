import { Fragment, useState, useEffect } from "react";
import { CgAdd } from "react-icons/cg";
import axios from "axios";

const ChosenCityPanel = ({ selectedCity }) => {
  // data is passed as a prop (selectedCity)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [historical24, setHistorical24] = useState(null);
  const query = selectedCity ? selectedCity.Key : "";

  //  function to update get city data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const responseWeatherData = await axios.get(
          `/api/weather/currentConditions?locationKey=${query}`
        );
        setWeatherData(responseWeatherData.data[0]);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
      try {
        setLoading(true);
        let responseHistorical = await axios.get(
          `/api/weather/historicalConditions?locationKey=${query}&hoursAgo=24`
        );
        setHistorical24(responseHistorical);
        const firstHourData = responseHistorical.data[0];
        const firstHourTemp = firstHourData.Temperature.Metric.Value; // Assuming temperature is stored this way
        console.log("Temperature for the first hour:", firstHourTemp, "°C");
        console.log("Object as whole: ", responseHistorical.data);
        console.log("Checking historical24: ", historical24);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (query !== "") {
      fetchData();
    }
  }, [query]);

  return (
    <div className="flex shadow-lg text-gray-800 h-200">
      {selectedCity ? (
        <div className="panel grid grid-cols-3 gap-4">
          {/* Left Side */}
          <div className="left-side flex flex-col p-4 justify-center items-center">
            <h1 className="city-name text-3xl font-bold text-gray-800">
              {selectedCity && selectedCity.LocalizedName}{" "}
            </h1>
            {loading ? (
              <p>Loading weather data...</p>
            ) : (
              <p className="city-temp text-lg text-gray-600">
                {weatherData &&
                  weatherData.Temperature &&
                  weatherData.Temperature.Metric && (
                      <>
                        {weatherData.Temperature.Metric.Value}
                        {weatherData.Temperature.Metric.Unit}
                      </>
                    )}
              </p>
            )}
          </div>
  
          {/* Right Side */}
          <div className="right-side grid grid-rows-2 gap-4">
            {/* Add to Favorites */}
            <div className="add-favorite flex items-center justify-center p-4">
              <CgAdd className="text-4xl text-gray-500" />
              <p className="text-lg font-bold ml-2">Add City to Favorites</p>
            </div>
  
            {/* Weather Grid */}
            <div className="weather-grid grid grid-cols-1">  {selectedCity ? (
  <div className="panel flex gap-4" style={{ overflowX: 'auto', height: '100px' }}>
  {/* 24 hours Weather */}
  {historical24 &&
  historical24.data.length > 0 &&
  historical24.data.map((hourData, index) => {
    const temperature = Math.ceil(hourData.Temperature.Metric.Value);
    const isPositive = temperature > 0;
    const currentHour = hourData.LocalObservationDateTime.substring(11, 13);

    return (
      <div key={index} className="day-weather flex flex-col items-center justify-center p-2">
        <span className="material-icons text-xl text-gray-500">
          {isPositive ? `+${temperature}` : temperature}
        </span>
        <p className="text-xs text-gray-600">
          {currentHour}:00
        </p>
      </div>
    );
  })}



</div>
              ) : (
                // Render message if no city is selected
                <div>Hourly weather data is missing.</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Render message if no city is selected
        <div>No city selected yet.</div>
      )}

    </div>
  );  
};

export default ChosenCityPanel;
