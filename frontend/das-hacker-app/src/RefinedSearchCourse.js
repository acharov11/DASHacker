// RefinedSearchCourse.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';
import SearchableDropdown from './SearchableDropdown';
import './RefinedSearch.css';

const RefinedSearchCourse = ({ onUpdateFilters  }) => {
  const [subjects, setSubjects] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [yearTerms, setYearTerms] = useState([]);
  const [courseTitle, setCourseTitles] = useState([]);

  useEffect(() => {
    // Function to fetch data from Firestore or retrieve from sessionStorage
    const fetchData = async () => {
      // Attempt to retrieve cached data
      const cachedSubjects = sessionStorage.getItem('subjects');
      const cachedInstructors = sessionStorage.getItem('instructors');
      const cachedYearTerms = sessionStorage.getItem('yearTerms');
      const cachedCourseTitles = sessionStorage.getItem('courseTitles');

      if (cachedSubjects && cachedInstructors && cachedYearTerms && cachedCourseTitles) {
        // If data is cached, use the cached data
        setSubjects(JSON.parse(cachedSubjects));
        setInstructors(JSON.parse(cachedInstructors));
        setYearTerms(JSON.parse(cachedYearTerms));
        setCourseTitles(JSON.parse(cachedCourseTitles));
      } else {
        // Data is not cached, fetch from Firestore
        const querySnapshot = await getDocs(collection(db, "Courses"));
        const subjectsSet = new Set();
        const instructorsSet = new Set();
        const yearTermsSet = new Set();
        const courseTitlesSet = new Set();

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          subjectsSet.add(data.subject);
          instructorsSet.add(data.instructor);
          yearTermsSet.add(data.yearTerm);
          courseTitlesSet.add(data.courseTitle);
        });

        // Convert Set to Array for state and cache the results
        const subjectsArray = [...subjectsSet];
        const instructorsArray = [...instructorsSet];
        const yearTermsArray = [...yearTermsSet];
        const courseTitlesArray = [...courseTitlesSet];

        setSubjects(subjectsArray);
        setInstructors(instructorsArray);
        setYearTerms(yearTermsArray);
        setCourseTitles(courseTitlesArray);

        sessionStorage.setItem('subjects', JSON.stringify(subjectsArray));
        sessionStorage.setItem('instructors', JSON.stringify(instructorsArray));
        sessionStorage.setItem('yearTerms', JSON.stringify(yearTermsArray));
        sessionStorage.setItem('courseTitles', JSON.stringify(courseTitlesArray));
      }
    };

    fetchData();
  }, []);

  // const onSelect = (selectedCourses) => {
  //   console.log("Courses selected from MultiCoursePicker:", selectedCourses);
    
  //   // Additional logic if needed
  // };

  return (
    <div className="refined-search-container">
      <div className="dropdown-container">
        <SearchableDropdown options={subjects} placeholder="Subject / Number" onSelect={(selected) => onUpdateFilters('subject', selected)} />
        <SearchableDropdown options={instructors} placeholder="Instructor" onSelect={(selected) => onUpdateFilters('instructor', selected)} />
        <SearchableDropdown options={yearTerms} placeholder="Year Term" onSelect={(selected) => onUpdateFilters('yearTerm', selected)} />
        <SearchableDropdown options={courseTitle} placeholder="Course Title" onSelect={(selected) => onUpdateFilters('courseTitle', selected)} />
      </div>
    </div>
  );
};

export default RefinedSearchCourse;
