import React from 'react';
import './FriendAddBar.css';

const FriendAddBar = ({ friendEmail, setFriendEmail, handleSubmit }) => {
  return (
    <div className="FriendPage">
      <h1>Friend Page</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <label>
          Email:
          <input type="text" value={friendEmail} onChange={(e) => setFriendEmail(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FriendAddBar;