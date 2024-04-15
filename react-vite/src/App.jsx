import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Optional for styling
import Tabs from './assets/tabs'


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
// <p className="text-3xl font-bold bg-red-400 underline">Loading data...</p>
  return (
    <div className="App">
      {serverData ? (
        <p>Data from server: {serverData.message}</p>
      ) : (
        <div>
          <Tabs />
        </div>
      )}
    </div>
  );
}

export default App;
