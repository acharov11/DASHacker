// UserSearchableDropdown.js
import React from 'react';
import Select from 'react-select';

const UserSearchableDropdown = ({ courses, onSelect }) => {
  // Map course titles to the format expected by react-select
  const options = courses.map(courseTitle => ({
    value: courseTitle, label: courseTitle
  }));

  const handleChange = selectedOption => {
    onSelect(selectedOption.value);
  };

  return <Select options={options} onChange={handleChange} />;
};

export default UserSearchableDropdown;
