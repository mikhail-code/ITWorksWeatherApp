import React, { useState, useEffect } from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    // Replace with actual authentication logic (e.g., API call)
    if (username === 'bob' && password === '12345') {
      localStorage.setItem('isLoggedIn', true); // Store login state in local storage (be cautious)
      setUsername('');
      setPassword('');
      setErrorMessage('');
      window.location.href = '/'; // Consider using history from react-router-dom for cleaner navigation
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default LoginPage;
