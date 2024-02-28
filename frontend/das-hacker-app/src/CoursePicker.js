import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';
import SearchableDropdown from './SearchableDropdown';
import './RefinedSearch.css';

const CoursePicker = ({ onSelect }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const cachedCourses = sessionStorage.getItem('courses');
        if (cachedCourses) {
          setCourses(JSON.parse(cachedCourses));
        } else {
          const querySnapshot = await getDocs(collection(db, "Courses"));
          const fetchedCourses = querySnapshot.docs.map(doc => doc.data().subject); // Using 'name' for clarity
          setCourses(fetchedCourses);
          sessionStorage.setItem('courses', JSON.stringify(fetchedCourses));
        }
      } catch (err) {
        setError('Failed to fetch courses');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="refined-search-container">
      <SearchableDropdown 
        options={courses} 
        placeholder="Search Courses" 
        onSelect={(selected) => onSelect(selected)}
      />
    </div>
  );
};

export default CoursePicker;
