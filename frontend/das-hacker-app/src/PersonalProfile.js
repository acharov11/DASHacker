import React, { useState, useEffect } from 'react';
import { doc, updateDoc, getDocs, collection } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import YearPicker from './YearPicker';
import MultiCoursePicker from './MultiCoursePicker';
import CoursePicker from './CoursePicker';
import MajorPicker from './MajorPicker';

const PersonalProfile = () => {
  const [name, setName] = useState(''); // Replace '' with the initial name
  const [year, setYear] = useState(1950); // Initialize year to 1950
  const [email, setEmail] = useState(''); // Initialize email to an empty string
  const [uid, setUid] = useState(null);
  const [major, setMajor] = useState('');
  const [courses, setCourses] = useState([]);
//   const [majors, setMajors] = useState('');

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
    console.log("Submitting courses:", courses);
    console.log('Updating name, year, and major:', name, year, major, courses);
    if (uid) {
      const db = getFirestore();
      const userDoc = doc(db, "Users", uid);
      await updateDoc(userDoc, {
        name: name,
        year: year,
        major: major,
        courses: courses
      });
    }
  };

  const handleCoursesChange = (selectedCourses) => {
    console.log("Courses selected from MultiCoursePicker:", selectedCourses);
    setCourses(selectedCourses); // Update state with selected courses
    // Additional logic if needed
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
        <YearPicker year={year} setYear={setYear} onSelect={(selectedYear) => setYear(selectedYear)} />
        <MajorPicker onSelect={(selectedMajor) => setMajor(selectedMajor)}/>
        <MultiCoursePicker onCoursesSelected={setCourses}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PersonalProfile;