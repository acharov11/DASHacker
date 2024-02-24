// PersonalProfile.js
import React, { useState, useEffect } from 'react';
import { auth } from './firebase-config'; // Import auth from your Firebase config
import YearPicker from './YearPicker';
import MultiCoursePicker from './MultiCoursePicker';
import './PersonalProfile.css'; // Create and import your CSS for styling

const PersonalProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Assume the user is already signed in
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email);
    }
  }, []);

  return (
    <div className="personal-profile-container">
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          readOnly // The email is not editable
        />
      </label>
      <YearPicker />
      <MultiCoursePicker />
    </div>
  );
};

export default PersonalProfile;
