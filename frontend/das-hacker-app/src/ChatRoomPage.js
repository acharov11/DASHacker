// ChatRoom.js
import React, { useState, useEffect, useRef } from 'react';
import { db } from './firebase-config';
import { collection, query, orderBy, onSnapshot, addDoc, doc, getDocs, where } from "firebase/firestore";
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
      const q = query(collection(db, "messages"), orderBy("createdAt"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let messagesArray = [];
        querySnapshot.forEach((doc) => {
          messagesArray.push(doc.data());
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
        isSentByMe: true,
        sender: email,
      });
  
      setNewMessage("");
      scrollToBottom();
    };
  
    return (

        <div className="chat-container">
        <h1>Global Chat</h1>
          <div className="messages">
            {messages.map((msg, index) => (
              <p key={index} className={`message ${msg.isSentByMe ? 'sent' : 'received'}`}>
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