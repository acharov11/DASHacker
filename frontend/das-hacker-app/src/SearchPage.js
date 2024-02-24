// SearchPage.js
import React, { useState } from 'react';
import SearchOption from './SearchOption';
import RefinedSearchCourse from './RefinedSearchCourse';
import RefinedSearchStudent from './RefinedSearchStudent';
import './HomePage.css'; 
import './SearchPage.css';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('Course'); // Default search type

  const handleSearch = (event) => {
    event.preventDefault();
    console.log('Searching for:', searchTerm, 'in category:', searchType);
    // Implement your search logic here
  };

  return (
    <div className="main-content">
      <form onSubmit={handleSearch} className="search-form">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="search-dropdown"
        >
          <SearchOption text="Course" />
          <SearchOption text="Student" />
        </select>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      {searchType === 'Course' ? <RefinedSearchCourse /> : <RefinedSearchStudent />}
    </div>
  );
};

export default SearchPage;
