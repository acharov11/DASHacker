import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-config'; // Adjust the path according to your file structure
import './NewLoginPage.css'; // Import the new CSS file here

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, username, password);
      console.log('Login successful');
      alert('Login successful!');
      // Redirect the user or update the UI as needed
    } catch (error) {
      console.error("Error during login:", error.message);
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div className="container">
      <div className="form">
        <label>
          Username (Email):
          <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className="button" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
