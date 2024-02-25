import React from 'react';
import { db } from './firebase-config'; // Adjust this path to your Firebase config file
import { collection, query, where, getDocs, updateDoc, arrayUnion, doc } from 'firebase/firestore';
import './FriendButton.css';

const FriendButton = ({ text, className, friendEmail, userID }) => {
  // Note: Removed onClick from props since we are defining specific functionality within the component

  const handleClick = async () => {
    try {
      // Define the userDocRef outside of the if block scope, if needed for updateDoc
      // let userDocRef;
      const userDocRef = doc(db, 'Users', userID);
      console.log(friendEmail);
      // Query the Users collection for a document where the email field matches friendEmail
      const userSnapshot = await getDocs(query(collection(db, 'Users'), where('email', '==', friendEmail)));

      // If a document is found
      if (!userSnapshot.empty) {
        userSnapshot.forEach(doc => {
          // Assuming you have the current user's document reference as userDocRef
          // Update here with the correct logic to obtain userDocRef if needed
          // userDocRef = doc.ref; // Example assignment, adjust according to your actual logic
        });

        // Proceed to update the document to add friendEmail to the friends array
        await updateDoc(userDocRef, {
          friends: arrayUnion(friendEmail)
        });
        alert('Friend added!');
      } else {
        alert('No user found with this email.');
      }
    } catch (error) {
      console.error("Error adding friend:", error);
      alert('Failed to add friend.');
    }
  };

  return (
    <button className={'friend-button'} onClick={handleClick}>
      {text}
    </button>
  );
};

export default FriendButton;
