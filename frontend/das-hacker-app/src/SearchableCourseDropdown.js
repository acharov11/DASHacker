// SearchableCourseDropdown.js
import React, { useState, useEffect } from 'react';
import SearchableDropdown from './SearchableDropdown';

const SearchableCourseDropdown = ({ options, placeholder, selectedCourse, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // When the selectedCourse changes, update the searchTerm
  useEffect(() => {
    if (selectedCourse) {
      setSearchTerm(selectedCourse);
    }
  }, [selectedCourse]);

  const handleSelect = (course) => {
    setSearchTerm(course); // Update searchTerm with the selected course
    onSelect(course); // Propagate the selection up to the parent component
  };

  return (
    <SearchableDropdown
      options={options}
      placeholder={placeholder}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      onSelect={handleSelect}
    />
  );
};

export default SearchableCourseDropdown;
