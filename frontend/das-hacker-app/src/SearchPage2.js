// SearchPage.js
import React, { useState, useEffect } from 'react';
import UserSearchableDropdown from './UserSearchableDropdown';
import DataTableUser from './DataTableUser';
// Import your Firebase utility functions
import { fetchCourses, fetchUsers } from './firebaseUtils';
import './SearchPage2.css';

const SearchPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [dropdownValue, setDropdownValue] = useState(null); // State to control the dropdown value

  useEffect(() => {
    const loadData = async () => {
      const coursesTitles = await fetchCourses();
      const usersData = await fetchUsers();
      setCourses(coursesTitles); // Set the state with the fetched course titles
      setUsers(usersData); // Set the state with the fetched users
      setFilteredUsers(usersData); // Initially, all users should be displayed
    };
    loadData();
  }, []);

  const handleCourseSelect = course => {
    if (course === '') {
      setSelectedCourse('');
      setFilteredUsers(users); // Reset to show all users when no course is selected
    } else {
      setSelectedCourse(course);
    }


    // When a course is selected, filter the users
    filterUsers(course);
  };

  const filterUsers = (course) => {
    if (!course) {
      // If no course is selected, show all users
      setFilteredUsers(users);
    } else {
      // Filter users by selected course
      const filtered = users.filter(user =>
        user.courses && user.courses.includes(course)
      );
      setFilteredUsers(filtered);
    }
  };

  const resetCourseSelection = () => {
    setSelectedCourse(''); // Clear the course selection
    setFilteredUsers(users); // Reset the filtered users to show all users
        // setDropdownValue(null); // Reset the dropdown value
  };

  // Assuming that the user's courses are stored in an array under a 'courses' key
  return (
    <div>
    <div className="search-dropdown">
      <button onClick={resetCourseSelection} className="reset-button">Reset</button>
      <UserSearchableDropdown
        courses={courses}
        onSelect={handleCourseSelect}
        selectedValue={selectedCourse}
      />
    </div>
    {/* <button onClick={() => filterUsers(selectedCourse)}>Submit</button> */}
    <DataTableUser filteredUsers={filteredUsers} />
  </div>
);
  };

export default SearchPage;
