// ChatRoom.js
import React, { useState, useEffect, useRef } from 'react';
import { db } from './firebase-config';
import { collection, query, orderBy, onSnapshot, addDoc, doc, getDocs, where, limit, deleteDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './ChatRoomPage.css';

const ChatRoomPage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null); // Add this line
    const [uid, setUid] = useState(null);
    const [email, setEmail] = useState(null);
  
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      };

    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"), limit(50));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let messagesArray = [];
        querySnapshot.forEach((doc) => {
        //   messagesArray.push(doc.data());
          messagesArray.unshift({ id: doc.id, ...doc.data() });
        });
        setMessages(messagesArray);
        scrollToBottom();
      });
  
      return () => unsubscribe();
    }, []);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            setUid(user.uid);
            setEmail(user.email);
          }
        });
      }, []);
  
    const sendMessage = async (e) => {
      e.preventDefault();
      if (newMessage.trim() === "") return;
  
      const auth = getAuth();
      const userEmail = auth.currentUser ? auth.currentUser.email : null;
  
  
      if (!userEmail) {
        console.log('No user is signed in.');
        return;
      }
      

      await addDoc(collection(db, "messages"), {
        text: newMessage,
        createdAt: new Date(),
        isSentByMe: email === auth.currentUser.email,
        sender: email,
      });

        // Cleanup: Check if messages exceed 50 after adding a new one, then delete the oldest
  const allMessagesQuery = query(collection(db, "messages"), orderBy("createdAt", "asc"));
  getDocs(allMessagesQuery).then((querySnapshot) => {
    const allMessages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    if (allMessages.length > 50) {
      const oldestMessageId = allMessages[0].id; // Assuming the first one is the oldest
      const docRef = doc(db, "messages", oldestMessageId);
      deleteDoc(docRef).then(() => {
        console.log("Oldest message deleted successfully.");
      }).catch((error) => {
        console.error("Error deleting oldest message: ", error);
      });
    }
  });

  
      setNewMessage("");
      scrollToBottom();
    };
  
    return (

        <div className="chat-container">
        <h1>Global Chat</h1>
          <div className="messages">
            {messages.map((msg, index) => (
              <p key={index} className={`message ${msg.sender === email ? 'sent' : 'received'}`}>
                <strong>{msg.sender} </strong>{msg.text}
            </p>
            ))}
            <div ref={messagesEndRef} /> {/* Invisible element at the end of messages */}
          </div>
          <form onSubmit={sendMessage} className="form-container">
            <input
              className="input-field"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message"
            />
            <button type="submit" className="send-button">Send</button>
            <button type="button" onClick={() => setMessages([])} className="clear-button">Clear Chat</button>
          </form>
        </div>

      );
            };

export default ChatRoomPage;