import React from 'react';

const UserEntry = ({ name, email, year }) => {
  return (
    <div className="user-entry">
      <div><strong>Name:</strong> {name}</div>
      <div><strong>Email:</strong> {email}</div>
      <div><strong>Year:</strong> {year}</div>
    </div>
  );
};

export default UserEntry;
