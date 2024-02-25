import React, { useState, useEffect } from 'react';
import SearchOption from './SearchOption';
import RefinedSearchCourse from './RefinedSearchCourse';
import RefinedSearchStudent from './RefinedSearchStudent';
import { getDocs, getFirestore, collection } from 'firebase/firestore';
import './HomePage.css'; 
import './SearchPage.css';
import UserTable from './UserTable';

const SearchPage = () => {
  const [searchType, setSearchType] = useState('Course'); // Default search type
  const [course, setCourse] = useState(''); // New state for course input
  const [users, setUsers] = useState([]); // New state for users

  useEffect(() => {
    const fetchUsers = async () => {
      const db = getFirestore();
      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map(doc => doc.data());
      setUsers(userList);
    };
  
    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const filteredUsers = users.filter(user => 
      Array.isArray(user.courses) && 
      user.courses.includes(course)
    );
    setUsers(filteredUsers); // Update the users state with the filtered users
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
