import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import './App.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
  }, []);


  return (
    <Router>
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate replace to="/home/profile" /> : <LoginPage />} />
        <Route path="/home/*" element={isLoggedIn ? <HomePage /> : <Navigate replace to="/login" />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
