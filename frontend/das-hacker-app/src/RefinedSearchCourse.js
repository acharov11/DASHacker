// RefinedSearch.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';
import SearchableDropdown from './SearchableDropdown';
import './RefinedSearch.css'; // Make sure to create this CSS file

const RefinedSearchCourse = () => {
  // Dummy data for dropdowns
  // const subjects = ["Math 101", "Science 201", "History 301"];
  // const instructors = ["John Doe", "Jane Smith", "Emily Johnson"];
  // const yearTerms = ["2021/Fall", "2022/Spring", "2022/Fall"];
  // const courseTitle = ["Statistics","Math","Computer Science"];

  const [subjects, setSubjects] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [yearTerms, setYearTerms] = useState([]);
  const [courseTitle, setCourseTitles] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const querySnapshot = await getDocs(collection(db, "Courses"));
      const subjects = new Set();
      const instructors = new Set();
      const yearTerms = new Set();
      const courseTitles = new Set();

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        subjects.add(data.subject);
        instructors.add(data.instructor);
        yearTerms.add(data.yearTerm);
        courseTitles.add(data.courseTitle);
      });

      // Convert Set to Array for state
      setSubjects([...subjects]);
      setInstructors([...instructors]);
      setYearTerms([...yearTerms]);
      setCourseTitles([...courseTitles]);
    };

    fetchCourses();
  }, []);



  return (
    <div className="refined-search-container">
      <div className="dropdown-container">
        <SearchableDropdown options={Array.from(subjects)} placeholder="Subject / Number" />
        <SearchableDropdown options={Array.from(instructors)} placeholder="Instructor" />
        <SearchableDropdown options={Array.from(yearTerms)} placeholder="Year Term" />
        <SearchableDropdown options={Array.from(courseTitle)} placeholder="Course Title" />
      </div>
    </div>
  );
};

export default RefinedSearchCourse;
