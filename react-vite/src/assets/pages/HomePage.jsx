import React from 'react';

function HomePage() {
  const username = localStorage.getItem('username') || 'Unknown'; // Retrieve stored username or default

  return (
    <div className="home-page">
      <h1>Welcome, {username}</h1>
    </div>
  );
}

export default HomePage;
