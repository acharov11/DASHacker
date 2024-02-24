import React from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config'; // Adjust the path to your Firebase config
import ProfilePage from './ProfilePage';
import SearchPage from './SearchPage';
import FriendsPage from './FriendsPage';
import './HomePage.css'; // Adjust the path to your CSS file


const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate('/login');
    }).catch((error) => {
      // An error happened.
      console.error('Logout Error:', error);
    });
  };

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="profile">Profile</Link></li>
            <li><Link to="search">Search</Link></li>
            <li><Link to="friends">Friends</Link></li>
          </ul>
        </nav>
        {/* Logout Button */}
        <button onClick={handleLogout}>Logout</button>
      </header>
      <main>
        <Routes>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="friends" element={<FriendsPage />} />
          <Route path="/" element={<Navigate replace to="profile" />} />
        </Routes>
      </main>
    </div>
  );
};

export default HomePage;
