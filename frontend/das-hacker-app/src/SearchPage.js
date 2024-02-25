import React, { useState } from 'react';
import SearchOption from './SearchOption';
import RefinedSearchCourse from './RefinedSearchCourse';
import RefinedSearchStudent from './RefinedSearchStudent';
import './HomePage.css'; 
import './SearchPage.css';
import UserTable from './UserTable';

const SearchPage = () => {
  const [searchType, setSearchType] = useState('Course'); // Default search type

  const handleSearch = (event) => {
    event.preventDefault();
    // Assuming you have state hooks in RefinedSearchCourse and RefinedSearchStudent
    // to hold the selected values, you'd use those here to perform the search.
    console.log('Performing refined search for:', searchType);
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
        {/* The refined search dropdowns will be rendered inline here */}
        {searchType === 'Course' ? (
          <RefinedSearchCourse />
        ) : (
          <RefinedSearchStudent />
        )}
        <button type="submit" className="search-button">Search</button>
        
      </form>
      <UserTable/>
    </div>
  );
};

export default SearchPage;
