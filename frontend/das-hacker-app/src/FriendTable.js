import React, { useState, useEffect } from 'react';
import { collection, getDocs, getDoc, doc, getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './FriendTable.css';


const FriendTable = () => {
    const [users, setUsers] = useState([]);
    const [uid, setUid] = useState(null);
    const db = getFirestore();
  
    useEffect(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUid(user.uid);
        }
      });
    }, []);
  
    useEffect(() => {
      if (uid) {
        const fetchUsers = async () => {
          const querySnapshot = await getDocs(collection(db, 'Users'));
          const usersData = querySnapshot.docs.map(doc => doc.data());
  
          // Get the current user's friends array
          const currentUserDoc = await getDoc(doc(db, 'Users', uid));
          const currentUserData = currentUserDoc.data();
          const currentUserFriends = currentUserData.friends;
  
          // Filter usersData to only include users who are friends of the current user
          const friendsData = usersData.filter(user => currentUserFriends.includes(user.email));
  
          setUsers(friendsData);
        };
  
        fetchUsers();
      }
    }, [db, uid]);

  return (
    <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
        <table className="friend-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Year</th>
            <th>Courses</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.year}</td>
              <td>
                  <ul>
                    {user.courses && user.courses.map((course, idx) => (
                      <li key={idx}>{course}</li>
                    ))}
                  </ul>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
    </div>
  );
};

export default FriendTable;
