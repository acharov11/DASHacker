import React from 'react';
import './FriendAddBar.css';

const FriendAddBar = ({ friendEmail, setFriendEmail, handleSubmit }) => {
  return (
    <div className="FriendPage">
      <h3>Add Friend</h3>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <label>
          {/*<input type="text" value={friendEmail} onChange={(e) => setFriendEmail(e.target.value)} />*/}
          <input className="friend-add-input" placeholder="Add a friend via email..." value={friendEmail} onChange={(e) => setFriendEmail(e.target.value)} />
        </label>
        {/*<button type="submit">Submit</button>*/}
        <button className="friend-add-button" type="submit">Add Friend</button>
      </form>
    </div>
  );
}

export default FriendAddBar;