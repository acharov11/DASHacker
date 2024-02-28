import React, { useState, useEffect } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import PersonalProfile from './PersonalProfile';
import './HomePage.css';

const ProfilePage = () => {
  const [year, setYear] = useState('');
  const [courses, setCourses] = useState([]);
  const [major, setMajor] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const db = getFirestore();
      const docRef = doc(db, 'users', 'userId'); // Replace 'userId' with the actual user ID
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setYear(data.year);
        setCourses(data.courses);
        setMajor(data.major);
      } else {
        console.log('No such document!');
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="main-content">
      <PersonalProfile year={year} courses={courses} major={major} />
    </div>
  );
};

export default ProfilePage;