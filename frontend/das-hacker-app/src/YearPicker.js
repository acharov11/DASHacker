// YearPicker.js
import React, { useState } from 'react';
import SearchableDropdown from './SearchableDropdown';

const YearPicker = ({ value, onSelect }) => {
  const years = Array.from({ length: 2027 - 1995 + 1 }, (v, k) => `${1995 + k}`);
  const [selectedYear, setSelectedYear] = useState('');

  return (
    <SearchableDropdown
      options={years}
      value={value}
      placeholder="Select Year"
      onSelect={onSelect}
    />
  );
};

export default YearPicker;
