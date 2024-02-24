// YearPicker.js
import React, { useState } from 'react';
import SearchableDropdown from './SearchableDropdown';

const YearPicker = () => {
  const years = Array.from({ length: 2027 - 1995 + 1 }, (v, k) => `${1995 + k}`);
  const [selectedYear, setSelectedYear] = useState('');

  return (
    <SearchableDropdown
      options={years}
      placeholder="Select Year"
      onSelect={setSelectedYear}
    />
  );
};

export default YearPicker;
