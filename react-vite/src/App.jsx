import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Optional for styling
import FavoritesBar from './assets/FavoritesBar'
// import Tabs from './assets/tabs'

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
    <div className="
    flex justify-center
    bg-red-500">
      <FavoritesBar />
    </div>
  );
}

export default App;
