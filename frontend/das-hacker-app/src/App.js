import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './LoginPage';
import CreateAccountButton from './CreateAccountButton';

function App() {
  return (
    <div className="App">
      <LoginPage />
      <CreateAccountButton />
    </div>
  );
}

export default App;
