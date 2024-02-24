import React, { useState } from 'react';
import CoursePicker from './CoursePicker';

const MultiCoursePicker = ({ onCoursesSelected }) => {
  // State to track all selected courses
  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleCourseSelect = (course, index) => {
    console.log(`Selecting course at index ${index}:`, course);
    // Update the specific course selection based on its index
    const updatedCourses = [...selectedCourses];
    updatedCourses[index] = course;
    console.log("Updated courses array:", updatedCourses);
    setSelectedCourses(updatedCourses);

    // Optionally, pass the updated courses array to a parent component or elsewhere
    onCoursesSelected && onCoursesSelected(updatedCourses);
  };

  const handleAddCoursePicker = () => {
    // Add a new course selection slot
    setSelectedCourses([...selectedCourses, '']);
  };

  return (
    <div>
      {selectedCourses.map((_, index) => (
        <div key={index}>
          <CoursePicker onSelect={(course) => handleCourseSelect(course, index)} />
        </div>
      ))}
      <button type="button" onClick={handleAddCoursePicker}>Add Course</button>
    </div>
  );
};

export default MultiCoursePicker;
