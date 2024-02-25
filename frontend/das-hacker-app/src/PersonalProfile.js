import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, getDocs, collection } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import YearPicker from './YearPicker';
import MultiCoursePicker from './MultiCoursePicker';
import CoursePicker from './CoursePicker';
import MajorPicker from './MajorPicker';
import './PersonalProfile.css';

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
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        setEmail(user.email);

        // Fetch user data from Firestore
        const db = getFirestore();
        const userDocRef = doc(db, "Users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          // Set the state with the fetched data
          const userData = userDocSnap.data();
          console.log("DATA: "+userData.name);
          console.log("DATA: "+userData.year);
          console.log("DATA: "+userData.major);
          console.log("DATA: "+userData.courses);;
          setName(userData.name || '');
          setYear(userData.year || '');
          setMajor(userData.major || '');
          setCourses(userData.courses || []);
        } else {
          console.log("No such document!");
        }
      } else {
        // User is signed out
        setUid(null);
        setEmail('');
        // Optionally reset other states to initial values
        setName('');
        setYear('');
        setMajor('');
        setCourses([]);
      }
    });
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
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <h1>Profile Page</h1>
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
          Year:
        <YearPicker value={year} setYear={setYear} onSelect={(selectedYear) => setYear(selectedYear)} />
          Major:
        <MajorPicker onSelect={(selectedMajor) => setMajor(selectedMajor)}/>
          Courses:
        <MultiCoursePicker onCoursesSelected={setCourses}/>
          <button type="submit" className='submit'>Submit</button>
        </label>
      </form>
    </div>
  );
};

export default PersonalProfile;