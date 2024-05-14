import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, MoonIcon } from "@heroicons/react/20/solid";

import { SunnyIcon, CloudyIcon, Moon } from "./AnimatedIcons";

const ChosenCityPanel = ({ isDarkMode, selectedCity }) => {
  // data is passed as a prop (selectedCity)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [historical24, setHistorical24] = useState(null);
  const [forecast12, setForecast12] = useState(null);
  const [forecast5days, setForecast5days] = useState(null);
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
        //historicalConditions
        setLoading(true);
        let responseHistorical = await axios.get(
          `/api/weather/historicalConditions?locationKey=${query}&hoursAgo=24`
        );
        setHistorical24(responseHistorical);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
      try {
        //get12HoursForecast
        setLoading(true);
        let responseForecast12 = await axios.get(
          `/api/weather/get12HoursForecast?locationKey=${query}`
        );
        setForecast12(responseForecast12);
        console.log("Checking responseForecast12: ", responseForecast12);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
      try {
        //get5DaysForecast
        setLoading(true);
        let responseForecast5 = await axios.get(
          `/api/weather/get5DaysForecast?locationKey=${query}`
        );
        setForecast5days(responseForecast5);
        console.log("Checking setForecast5days: ", responseForecast5);
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

  //  removed shadow: shadow-lg
  return (
    <div className="flex justify-center text-gray-800 h-200 w-screen">
      <div className="fixed-width-784 max-w-96 justify-end">
        {selectedCity ? (
          <div className="panel flex flex-row items-end justify-end gap-4">
            {/* Left Side */}
            <div className="flex-grow">
              <div className="left-side flex flex-col p-4  items-end justify-center min-h-96">
                {weatherData && weatherData.Temperature && (
                  <>
                    {weatherData.WeatherIcon && (
                      <>
                        {([6, 7, 35, 38].includes(weatherData.WeatherIcon) && (
                          <>
                            <CloudyIcon />
                          </>
                        )) ||
                          ([1, 2, 3, 33].includes(weatherData.WeatherIcon) && (
                            <>{isDarkMode ? <Moon /> : <SunnyIcon />}</>
                          )) ||
                          ([
                            12, 13, 14, 15, 16, 17, 18, 26, 29, 39, 40, 41, 42,
                          ].includes(weatherData.WeatherIcon) && (
                            <>
                              <div className="thundery">
                                <div className="thundery__cloud"></div>
                                <div className="thundery__rain"></div>
                              </div>
                            </>
                          ))}
                      </>
                    )}
                  </>
                )}
                <h1 className={isDarkMode ? "text-white" : "text-black"}>
                  <span className="city-name text-3xl font-bold whitespace-wrap">
                    {selectedCity && selectedCity.LocalizedName}
                  </span>
                </h1>
                {loading ? (
                  <p>Loading weather data...WeatherIcon</p>
                ) : (
                  <p className="city-temp text-5xl text-gray-600">
                    {weatherData &&
                      weatherData.Temperature &&
                      weatherData.Temperature.Metric && (
                        <>
                          {isDarkMode ? (
                            <span className="text-white">
                              {weatherData.Temperature.Metric.Value}
                              {"°" + weatherData.Temperature.Metric.Unit}
                            </span>
                          ) : (
                            <>
                              {weatherData.Temperature.Metric.Value}
                              {"°" + weatherData.Temperature.Metric.Unit}
                            </>
                          )}
                        </>
                      )}
                  </p>
                )}
                <div className="flex flex-row items-center">
                  <p className="ml-2 text-sm">
                    <div className={isDarkMode ? "text-white" : "text-black"}>
                      {weatherData && weatherData.Temperature && (
                        <>
                          {weatherData.WeatherIcon && (
                            <>
                              {([6, 7, 35, 38].includes(
                                weatherData.WeatherIcon
                              ) && <>Cloudy</>) ||
                                ([1, 2, 3, 33].includes(
                                  weatherData.WeatherIcon
                                ) && <>Clear</>) ||
                                ([
                                  12, 13, 14, 15, 16, 17, 18, 26, 29, 39, 40,
                                  41, 42,
                                ].includes(weatherData.WeatherIcon) && (
                                  <>Precipitation</>
                                ))}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side */}
            {/* FORECAST */}
            <div className="weather-grid flex flex-col justify-center items-center max-w-96 min-w-96">
              {selectedCity ? ( // 5 DAYS FORECAST
                <div className="w-full flex px-4 pt-4">
                  <div className="mx-auto min-h-44 w-full max-w-md rounded-2xl bg-white p-2">
                    <Disclosure defaultOpen={true}>
                      {({ open }) => (
                        <>
                          {" "}
                          {/* Removed: bg-white-100 text-purple-900 */}
                          <Disclosure.Button className="theme-secondary-color hover:theme-secondary-color-hover flex w-full justify-between rounded-lg   px-4 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-gray-200/75">
                            <span>12 hours forecast</span>
                            <ChevronUpIcon
                              className={`${
                                open ? "rotate-180 transform" : ""
                              } h-5 w-5 text-gray-500`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                            {selectedCity ? ( // 12 hours forecaßst
                              <div
                                className="panel flex gap-4"
                                style={{ overflowX: "auto", height: "75px" }}
                              >
                                {/* 12 hours Weather */}
                                {forecast12 &&
                                  forecast12.data.length > 0 &&
                                  forecast12.data.map((hourData, index) => {
                                    const temperature = Math.ceil(
                                      hourData.Temperature.Value
                                    );
                                    const isPositive = temperature > 0;
                                    const currentHour =
                                      hourData.DateTime.substring(11, 13);

                                    return (
                                      <div
                                        key={index}
                                        className="day-weather flex flex-col items-center justify-center p-2"
                                      >
                                        <span className="material-icons text-xl text-gray-500">
                                          {isPositive
                                            ? `+${temperature}`
                                            : temperature}
                                        </span>
                                        <p className="text-xs text-gray-600">
                                          {currentHour}:00
                                        </p>
                                      </div>
                                    );
                                  })}
                              </div>
                            ) : (
                              <div>Hourly weather data is missing.</div>
                            )}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </div>
                </div>
              ) : (
                <div>Weather data is missing.</div>
              )}
              {selectedCity ? ( // 5 DAYS FORECAST
                <div className="w-full min-h-52 flex px-4 pt-4">
                  <div className="mx-auto  w-full max-w-md rounded-2xl bg-white p-2">
                    <Disclosure defaultOpen={true}>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="theme-secondary-color hover:theme-secondary-color-hover flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium focus:outline-none">
                            <span>5 days forecast</span>
                            <ChevronUpIcon
                              className={`${
                                open ? "rotate-180 transform" : ""
                              } h-5 w-5 text-gray-500`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                            {selectedCity ? (
                              <div
                                className="panel flex gap-4"
                                style={{ overflowX: "auto", height: "100px" }}
                              >
                                {/* 24 hours Weather */}
                                {forecast5days &&
                                  forecast5days.data.DailyForecasts.length >
                                    0 &&
                                  forecast5days.data.DailyForecasts.map(
                                    (dayData, index) => {
                                      const dateString = dayData.Date;
                                      const dateParts = dateString.split("-"); // Split by hyphens
                                      const year = dateParts[0];
                                      const month = dateParts[1]; // Extract month (e.g., "05")
                                      const day = dateParts[2]; // Extract day (e.g., "04")
                                      const newDate = new Date(
                                        parseInt(year),
                                        parseInt(month) - 1,
                                        parseInt(day)
                                      ); // Adjust month for zero-based indexing
                                      const options = {
                                        month: "short",
                                        day: "numeric",
                                      }; // Customize format options
                                      const formattedDate =
                                        newDate.toLocaleDateString(
                                          "en-US",
                                          options
                                        ); // Use 'en-GB' for British English format (Feb 1)
                                      const temperatureMin = Math.ceil(
                                        dayData.Temperature.Minimum.Value
                                      );
                                      const temperatureMax = Math.ceil(
                                        dayData.Temperature.Maximum.Value
                                      );
                                      return (
                                        <div
                                          key={index}
                                          className="day-weather flex flex-col items-center justify-center p-2"
                                        >
                                          <span className="material-icons flex flex-row whitespace-nowrap text-xl text-gray-500">
                                            {temperatureMin > 0
                                              ? `+${temperatureMin}`
                                              : temperatureMin}{" "}
                                            /{" "}
                                            {temperatureMax > 0
                                              ? `+${temperatureMax}`
                                              : temperatureMax}
                                          </span>
                                          <p className="text-xs text-gray-600">
                                            {formattedDate}
                                          </p>
                                        </div>
                                      );
                                    }
                                  )}
                              </div>
                            ) : (
                              <div>Hourly weather data is missing.</div>
                            )}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </div>
                </div>
              ) : (
                <div>Daily weather data is missing.</div>
              )}
            </div>
          </div>
        ) : (
          // Render message if no city is selected
          <div
            className={
              isDarkMode ? "text-white text-center" : "text-black text-center"
            }
          >
            {selectedCity ? `Current City: ${selectedCity}` : "Choose city"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChosenCityPanel;
