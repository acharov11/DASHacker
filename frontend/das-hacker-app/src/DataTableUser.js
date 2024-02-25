// UserDataTable.js
import React, { useState, useEffect } from 'react';
import './FriendButton';
import FriendButton from './FriendButton';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const DataTableUser = ({ filteredUsers }) => {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
      }
    });
  }, []);
  
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Year</th>
          <th>Courses</th>
          <th>Add Friend</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map(user => (
          <tr key={user.email}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.year}</td>
            <td>{user.courses.join(', ')}</td>
            <td><FriendButton
                  text="Add Friend"
                  className="custom-class"
                  friendEmail={user.email}
                  userID={uid}
            /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTableUser;
