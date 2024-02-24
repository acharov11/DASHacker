// LoginPage.js
import React, { useState } from 'react';
import { auth } from './firebase-config'; // Adjust the path according to your file structure
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import './NewLoginPage.css'; // Ensure this CSS file includes the new styles
import CreateAccountButton from './CreateAccountButton';
import LoginButton from './LoginButton';
import { useNavigate } from 'react-router-dom';
import { getFirestore } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful');
      alert('Login successful!');
      navigate('/home');
      // Redirect the user or update the UI as needed
    } catch (error) {
      console.error("Error during login:", error.message);
      alert('Login failed: ' + error.message);
    }
  };

  const handleCreateAccount = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user) {
        const db = getFirestore();
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email
        });
 
        console.log('Account created successfully');
        alert('Account created successfully!');
        navigate('/home');
        // Redirect the user or update the UI as needed
      } else {
        throw new Error('User creation failed');
      }
 


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
          <LoginButton onClick={handleLogin}/>
          <CreateAccountButton onClick={handleCreateAccount}/>
      </div>
    </div>
  );
};

export default LoginPage;
