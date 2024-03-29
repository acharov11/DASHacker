import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, getDocs, collection } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './FriendPage.css';

const FriendTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'Users'));
      const usersData = querySnapshot.docs.map(doc => doc.data());
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FriendTable;
