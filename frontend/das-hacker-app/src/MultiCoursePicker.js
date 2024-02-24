import React, { useState, useEffect } from 'react';
import SearchableCourseDropdown from './SearchableCourseDropdown'; // Ensure this is correctly imported
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase-config'; // Ensure db is correctly imported

const MultiCoursePicker = () => {
  const [coursePickers, setCoursePickers] = useState([{ id: Date.now(), selectedCourse: '' }]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const loadCourses = async () => {
      const cachedCourses = sessionStorage.getItem('courses');
      if (cachedCourses) {
        setCourses(JSON.parse(cachedCourses));
      } else {
        const querySnapshot = await getDocs(collection(db, "Courses"));
        const fetchedCourses = [];
        querySnapshot.forEach((doc) => {
          fetchedCourses.push(doc.data().name); // Adjust according to your data structure
        });
        sessionStorage.setItem('courses', JSON.stringify(fetchedCourses));
        setCourses(fetchedCourses);
      }
    };

    loadCourses();
  }, []);

  const handleAddCoursePicker = () => {
    setCoursePickers([...coursePickers, { id: Date.now(), selectedCourse: '' }]);
  };

  const handleCourseSelect = (id, course) => {
    const updatedPickers = coursePickers.map(picker => {
      if (picker.id === id) {
        return { ...picker, selectedCourse: course };
      }
      return picker;
    });
    setCoursePickers(updatedPickers);
  };

  return (
    <div>
      {coursePickers.map((picker) => (
        <SearchableCourseDropdown
          key={picker.id}
          options={courses}
          placeholder="Select a course"
          selectedCourse={picker.selectedCourse}
          onSelect={(course) => handleCourseSelect(picker.id, course)}
        />
      ))}
      <button type="button" onClick={handleAddCoursePicker}>+</button>
    </div>
  );
};

export default MultiCoursePicker;
