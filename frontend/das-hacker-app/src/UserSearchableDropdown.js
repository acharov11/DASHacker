// UserSearchableDropdown.js
import React from 'react';
import Select from 'react-select';

const UserSearchableDropdown = ({ courses, onSelect }) => {
  
  
  
  const handleChange = selectedOption => {
    // Check if selectedOption is null, which indicates the clear action was used
    if (selectedOption === null) {
      onSelect(''); // You may decide to use an empty string or null based on how you've set up your state
    } else {
      onSelect(selectedOption.value);
    }
  };

  const options = courses.map(course => ({
    value: course, label: course
  }));

  return <Select 
  options={options}
  onChange={handleChange}
  isClearable
  placeholder="Choose your course..."
  />;
};

export default UserSearchableDropdown;
