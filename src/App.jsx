import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignInForm from './components/SignInForm';
import Editor from "./pages/editor/App";
// import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial login state

  useEffect(() => {
    // Retrieve stored login state (implement your preferred storage mechanism)
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(storedLoggedIn === 'true');
  }, []);

  const handleLogin = (username, password) => {
    // Implement login logic (e.g., API call, validation)
    if (username === 'admin' && password === 'password') { // Example credentials
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true'); // Store login state
    } else {
      // Handle invalid login attempt
      console.error('Invalid login credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Clear stored data
  };

  return (
    <Router>
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              // <Dashboard onLogout={handleLogout} />
              () => <h1>Dashboard</h1>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Editor Route */}
        <Route
          path="/editor"
          element={<Editor />
          }
        />

        {/* Public Route */}
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <SignInForm onLogin={handleLogin} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        {/* Default Route (redirect to Login) */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;