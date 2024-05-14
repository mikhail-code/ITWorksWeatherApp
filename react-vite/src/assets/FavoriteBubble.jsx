import { CgAdd, CgRemove } from "react-icons/cg";
import React, { useState, useEffect } from "react";
import axios from "axios";

const FavoriteBubble = ({
  city,
  handleAddFavorite,
  handleRemoveFavorite,
  onCitySelected,
  addToFavoriteTooltip = "Pin",
  isDarkMode,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const query = city ? city.Key : "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const responseWeatherData = await axios.get(
          `/api/weather/currentConditions?locationKey=${query}`
        );
        setWeatherData(responseWeatherData.data[0]);
        console.log(
          "Set temp for bubble (setWeatherData) :" + responseWeatherData
        );
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

  // Check if city object is empty (falsy)
  const isEmpty = !city;

  const handleBubbleClick = () => {
    if (isEmpty) {
      handleAddFavorite();
    } else {
      onCitySelected(city);
    }
  };

  // Function to process city name (remove symbols after comma and truncate if needed)
  const getProcessedCityName = (cityName) => {
    if (!cityName) return "";

    // Split the city name by comma and trim leading/trailing whitespaces
    const parts = cityName.split(",").map((part) => part.trim());

    const mainPart = parts[0]; // Get the main part before comma

    // Process each word in the main part
    const processedWords = mainPart.split(" ").map((word) => {
      if (word.length > 9) {
        return `${word.substring(0, 10)}..`; // Truncate to 10 chars and add "..."
      }
      return word;
    });

    // Join the processed words back into a string
    return processedWords.join(" ");
  };

  return (
    <div className="favorite-bubble">
      <p
        className={`${
          isDarkMode ? "text-white" : "text-gray-700"
        } text-center font-bold py-1 px-2 inset-0 z-10`}
      >
        {isEmpty ? (
          <div className="favorite-bubble  group">
            <CgAdd className="text-3xl text-white" onClick={handleBubbleClick} />{" "}
          </div>
        ) : (
          <>
            <span onClick={handleBubbleClick}>
              {getProcessedCityName(city?.LocalizedName)}
            </span>{" "}
            <br />
            {loading ? (
              "Loading..."
            ) : (
              <>
                {loading ? (
                  "Loading..."
                ) : (
                  <>
                    {weatherData?.Temperature?.Metric.Value}{" "}
                    {weatherData?.Temperature?.Metric.Unit}
                  </>
                )}
              </>
            )}
            {/* Add CgRemove icon for non-empty bubbles with absolute positioning */}
            {!isEmpty && (
              <CgRemove
                className={`${isDarkMode ? "text-white" : "text-black"} remove-icon`}
                onClick={(event) => {
                  event.stopPropagation(); // Stop event bubbling
                  console.log("city to remove " + city.Key)
                  handleRemoveFavorite(city);
                }}
              />
            )}
          </>
        )}
      </p>
    </div>
  );
};

export default FavoriteBubble;
