// LoginButton.js
import React from 'react';

const LoginButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="button login">
      Login
    </button>
  );
};

export default LoginButton;
