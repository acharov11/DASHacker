// firebaseUtils.js
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase-config'; // Assume you have Firebase config set up

export const fetchCourses = async () => {
  const coursesSet = new Set(); // Use a set to store unique course titles
  try {
    const snapshot = await getDocs(collection(db, "Courses"));
    snapshot.forEach(doc => {
      const courseData = doc.data();
      coursesSet.add(courseData.subject); // Add the course title to the set
      // console.log(doc.data().subject)
    });
    return Array.from(coursesSet); // Convert set back to array
  } catch (error) {
    console.error("Error fetching courses: ", error);
    return [];
  }
};

  
  export const fetchUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'Users'));
      const users = snapshot.docs.map(doc => doc.data());
      const usersList = [];
      snapshot.forEach(doc => {
        usersList.push({ id: doc.id, ...doc.data() });
        console.log("name: "+doc.data().name);
      });
      return users;
    } catch (error) {
      console.error("Error fetching users: ", error);
      return [];
    }
  };
