// ChatRoom.js
import React, { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore";
import './ChatRoomPage.css';

const ChatRoomPage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
  
    useEffect(() => {
      const q = query(collection(db, "messages"), orderBy("createdAt"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let messagesArray = [];
        querySnapshot.forEach((doc) => {
          messagesArray.push(doc.data());
        });
        setMessages(messagesArray);
      });
  
      return () => unsubscribe();
    }, []);
  
    const sendMessage = async (e) => {
      e.preventDefault();
      if (newMessage.trim() === "") return;
  
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        createdAt: new Date(),
      });
  
      setNewMessage("");
    };
  
    return (
        <div className="chat-container">
          <div className="messages">
            {messages.map((msg, index) => (
              <p key={index} className="message">{msg.text}</p>
            ))}
          </div>
          <form onSubmit={sendMessage} className="form-container">
            <input
              className="input-field"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message"
            />
            <button type="submit" className="send-button">Send</button>
          </form>
        </div>
      );
            };

export default ChatRoomPage;