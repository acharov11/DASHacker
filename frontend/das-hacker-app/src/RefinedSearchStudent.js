// RefinedSearchStudent.js
import React from 'react';
import SearchableDropdown from './SearchableDropdown';
import './RefinedSearch.css'; // Reuse the same CSS as before

const RefinedSearchStudent = () => {
  // Example data for students, replace with actual student-specific options
  const majors = ["Biology", "Computer Science", "Art History"];
  const statuses = ["Full-time", "Part-time"];
  const classYears = ["Freshman", "Sophomore", "Junior", "Senior"];

  return (
    <div className="refined-search-container">
      <div className="dropdown-container">
        <SearchableDropdown options={majors} placeholder="Major" />
        <SearchableDropdown options={statuses} placeholder="Status" />
        <SearchableDropdown options={classYears} placeholder="Class Year" />
      </div>
    </div>
  );
};

export default RefinedSearchStudent;
