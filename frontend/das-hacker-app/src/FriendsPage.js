import React, { useState, useEffect } from 'react';
import { collection, doc, updateDoc, getFirestore, getDocs, where, query, arrayUnion } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import FriendAddBar from './FriendAddBar.js';

const FriendsPage = () => {
  const [friendEmail, setFriendEmail] = useState('');
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
      }
    });
  }, []);

  const handleSubmit = async () => {
    if(uid) {
      const db = getFirestore();
      const userDocRef = doc(db, 'Users', uid);

      // Query the Users collection for a document where the email field matches friendEmail
      const userSnapshot = await getDocs(query(collection(db, 'Users'), where('email', '==', friendEmail)));

      // If a document is found, add friendEmail to the friends array
      if (!userSnapshot.empty) {
        await updateDoc(userDocRef, {
          friends: arrayUnion(friendEmail)
        });
        alert('Friend added!'); // Alert if friend is added
      } else {
        alert('No user found with this email.'); // Alert if no user is found
      }
    }
  }

  return (
    <div className="friends-page">
      <FriendAddBar friendEmail={friendEmail} setFriendEmail={setFriendEmail} handleSubmit={handleSubmit} /> 
    </div>
  );
};

export default FriendsPage;