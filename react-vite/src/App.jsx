import { useState, useEffect } from 'react';
import axios from 'axios';
import FavoritesBar from './assets/FavoritesBar';
import ChosenCityPanel from './assets/ChosenCityPanel';
import SearchBar from './assets/SearchBar';

console.log("API endpoint:", '/api/data'); // Log the endpoint

function App() {
  const [serverData, setServerData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data');
        setServerData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-start items-center">
      <FavoritesBar />
      <ChosenCityPanel />
      <SearchBar />
    </div>
  );
}

export default App;
