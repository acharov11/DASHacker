// CreateAccountButton.js
import React from 'react';

const CreateAccountButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="button create">
      Create Account
    </button>
  );
};

export default CreateAccountButton;
