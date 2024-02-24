import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';
import SearchableDropdown from './SearchableDropdown';
import './RefinedSearch.css'; // Ensure CSS styles are adjusted as needed

const MajorPicker = ({ onSelect }) => {
  const [majors, setMajors] = useState([]);

  useEffect(() => {
    // Function to fetch courses from Firestore or retrieve from sessionStorage
    const fetchData = async () => {
      const cachedMajors = sessionStorage.getItem('major');
      
      if (cachedMajors) {
        // Use cached data if available
        setMajors(JSON.parse(cachedMajors));
      } else {
        // Fetch from Firestore if not cached
        const querySnapshot = await getDocs(collection(db, "majors"));
        const fetchedMajors = querySnapshot.docs.map(doc => doc.data().majors); // Assuming 'name' is the field for course names

        // Cache the fetched course names
        
        setMajors(fetchedMajors);
        console.log(fetchedMajors); // This should log the fetched course titles to the console

        sessionStorage.setItem('major', JSON.stringify(fetchedMajors));
      }
    };

    fetchData();
  }, []);

  return (
    <div className="refined-search-container">
      <SearchableDropdown 
        options={majors} 
        placeholder="Search Major" 
        onSelect={onSelect}
      />
    </div>
  );
};

export default MajorPicker;
