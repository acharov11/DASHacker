import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';
import RefinedSearchCourse from './RefinedSearchCourse';
import RefinedSearchStudent from './RefinedSearchStudent';
import UserTable from './UserTable';
import './HomePage.css';
import './SearchPage.css';
import './SearchOption';

const SearchPage = () => {
  const [searchType, setSearchType] = useState('Course');
  const [filters, setFilters] = useState({
    subject: '',
    yearTerm: '',
    instructor: '',
    courseTitle: [],
  });
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'Users'));
      const usersData = querySnapshot.docs.map(doc => doc.data());
      setUsers(usersData);
      setFilteredUsers(usersData); // Initially, show all users
    };
    fetchUsers();
  }, []);

  const handleUpdateFilters = (filterType, value) => {
  // If the selection is cleared, selectedValue might be empty
  setFilters(prevFilters => ({
    ...prevFilters,
    [filterType]: value || '' // Reset the filter if cleared
  }));
  };

  const handleSearch = (event) => {
    event.preventDefault();

    // Log current filters
    console.log('Current filters:', filters);

    // Handle the case where all filters are empty
    if (Object.values(filters).every(filter => filter === '')) {
      console.log('No filters applied, showing all users.');
      setFilteredUsers(users);
      return;
    }

    //   const applyFilters = users.filter(user => {
    //   // const subjectMatch = !filters.subject || (user.subjects && user.subjects.includes(filters.subject));
    //   // const yearTermMatch = !filters.yearTerm || user.yearTerm === filters.yearTerm;
    //   // const instructorMatch = !filters.instructor || user.instructor === filters.instructor;
    //   const courseTitleMatch = !filters.courseTitle || user.courseTitle === filters.courseTitle;
    //   return subjectMatch && yearTermMatch && instructorMatch && courseTitleMatch;
    // });
    const applyFilters = users.filter(user =>
      (!filters.subject || (user.subjects && user.subjects.includes(filters.subject)))
    );
    console.log("applyFilters: "+applyFilters);
    setFilteredUsers(applyFilters);
  };
  return (
    <div className="main-content">
      <form onSubmit={handleSearch} className="search-form">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="search-dropdown"
        >
          <option value="Course">Course</option> {/* Directly using option elements */}
          <option value="Student">Student</option>
        </select>
        {searchType === 'Course' ? (
          <RefinedSearchCourse onUpdateFilters={handleUpdateFilters} />
        ) : (
          <RefinedSearchStudent onUpdateFilters={handleUpdateFilters} />
        )}
        <button type="submit" className="search-button">Search</button>
      </form>
      <UserTable users={filteredUsers} />
    </div>
  );
}
;
export default SearchPage;
