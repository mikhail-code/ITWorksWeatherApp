import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import axios from 'axios';
import FavoritesBar from './assets/FavoritesBar';
import ChosenCityPanel from './assets/ChosenCityPanel';
import SearchBar from './assets/SearchBar';
import WeatherForCityPage from './assets/pages/WeatherForCityPage';
import ExerciseToDoList from './assets/pages/Excercise'
import Blackjack from './assets/pages/Blackjack'
import LoginPage from './assets/pages/LoginPage';
import HomePage from './assets/pages/HomePage';

console.log("API endpoint:", '/api/data'); // Log the endpoint


function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check for stored login state

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;


//   return (
//     <div className="App">
//       <LoginPages></LoginPages>
//     </div>
//   );
// }

// export default App;