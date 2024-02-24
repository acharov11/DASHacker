// LoginPage.js
import React, { useState } from 'react';
import { auth } from './firebase-config'; // Adjust the path according to your file structure
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import './NewLoginPage.css'; // Ensure this CSS file includes the new styles

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful');
      alert('Login successful!');
      // Redirect the user or update the UI as needed
    } catch (error) {
      console.error("Error during login:", error.message);
      alert('Login failed: ' + error.message);
    }
  };

  const handleCreateAccount = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Account created successfully');
      alert('Account created successfully!');
      // Redirect the user or update the UI as needed
    } catch (error) {
      console.error("Error creating account:", error.message);
      alert('Account creation failed: ' + error.message);
    }
  };

  return (
    <div className="container">
      <div className="form">
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className="button login" onClick={handleLogin}>Login</button>
        <button className="button create" onClick={handleCreateAccount}>Create Account</button>
      </div>
    </div>
  );
};

export default LoginPage;
