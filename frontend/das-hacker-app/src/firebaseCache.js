// firebaseCache.js
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';

export const getCachedCourses = async () => {
  const cachedCourses = sessionStorage.getItem('courses');
  if (cachedCourses) {
    return JSON.parse(cachedCourses);
  } else {
    const querySnapshot = await getDocs(collection(db, "Courses"));
    const courses = querySnapshot.docs.map(doc => doc.data().name); // Assuming each course document has a 'name' field
    sessionStorage.setItem('courses', JSON.stringify(courses));
    return courses;
  }
};
