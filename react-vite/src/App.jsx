import { useState, useEffect } from 'react';
import axios from 'axios';
import FavoritesBar from './assets/FavoritesBar';
import ChosenCityPanel from './assets/ChosenCityPanel';
import SearchBar from './assets/SearchBar';
import WeatherForCityPage from './assets/pages/WeatherForCityPage';

console.log("API endpoint:", '/api/data'); // Log the endpoint

function App() {
  const [serverData, setServerData] = useState(null);

  // debugging search bar:
  const cities = [
    { id: 1, name: 'Tel Aviv' },
    { id: 2, name: 'Moscow' },
    { id: 3, name: 'London' },
  ];
  const [selected, setSelected] = useState(cities[0].name);
  const [query, setQuery] = useState('Tel');
  const [filteredCities, setFilteredCities] = useState([]);

  // const fetchCitySuggestions = async (query) => {
  //   try {
  //     const response = await axios.get(`/weather/searchCity?q=${query}`);
  //     setFilteredCities(response.data);
  //   } catch (error) {
  //     console.error('Error fetching city suggestions:', error);
  //   }
  // };

  // useEffect(() => {
  //   if (query.length > 0) {
  //     fetchCitySuggestions(query);
  //   } else {
  //     setFilteredCities([]);
  //   }
  // }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/weather/searchCity?q=${query}`);
        setServerData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  // return (
  //   <div className="min-h-screen flex flex-col justify-start items-center">
  //     <FavoritesBar />
  //     <ChosenCityPanel />
  //     <SearchBar />
  //   </div>
  // );
  return (
    <div className="App">
      <WeatherForCityPage />
    </div>
  );
}

export default App;