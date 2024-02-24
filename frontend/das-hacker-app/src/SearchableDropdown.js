// SearchableDropdown.js
import React, { useState } from 'react';
import './SearchableDropdown.css'; // Ensure to create this CSS file

const SearchableDropdown = ({ options, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const filteredOptions = options.filter(
    (option) => option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="searchable-dropdown">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setShowOptions(true)}
        onBlur={() => setTimeout(() => setShowOptions(false), 200)}
      />
      {showOptions && (
        <ul className="options-list">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onMouseDown={() => setSearchTerm(option)} // onMouseDown fires before onBlur
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableDropdown;
