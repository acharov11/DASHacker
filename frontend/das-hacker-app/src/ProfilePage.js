// ProfilePage.js
import React from 'react';
import PersonalProfile from './PersonalProfile'; // Make sure to import PersonalProfile
import './HomePage.css'; // Assuming you want the same styles

const ProfilePage = () => {
  return (
    <div className="main-content">
      <PersonalProfile />
    </div>
  );
};

export default ProfilePage;
