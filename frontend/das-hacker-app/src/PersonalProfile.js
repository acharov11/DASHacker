import React, { useState, useEffect } from 'react';
import { doc, updateDoc } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import YearPicker from './YearPicker';
import MultiCoursePicker from './MultiCoursePicker';

const PersonalProfile = () => {
  const [name, setName] = useState(''); // Replace '' with the initial name
  const [year, setYear] = useState(1950); // Initialize year to 1950
  const [email, setEmail] = useState(''); // Initialize email to an empty string
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        setEmail(user.email);
      } else {
        // User is signed out
        setUid(null);
        setEmail('');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    console.log('Updating name and year:', name, year);
    if (uid) {
      const db = getFirestore();
      const userDoc = doc(db, "Users", uid);
      await updateDoc(userDoc, {
        name: name,
        year: year
      });
    }
  };

  return (
    <div className="HomePage">
      <h1>Profile Page</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            readOnly // The email is not editable
          />
        </label>
        <YearPicker year={year} setYear={setYear} />
        <MultiCoursePicker />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PersonalProfile;