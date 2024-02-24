// SearchableDropdown.js
import React, { useState, useEffect } from 'react';
import './SearchableDropdown.css'; // Ensure to create this CSS file

const SearchableDropdown = ({ options, placeholder, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const filteredOptions = (options || []).filter(
    (option) => option && option.toLowerCase().includes(searchTerm.toLowerCase())
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
            onMouseDown={() => {
              setSearchTerm(option); // Set the searchTerm to the chosen option
              onSelect(option); // Call the onSelect prop passed from the parent
            }}
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
