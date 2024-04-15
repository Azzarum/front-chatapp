// ChatPage.js
import React, { useState } from 'react';
import './chat.css'; // Importation du fichier CSS

const ChatPage = () => {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Username submitted:', username);
    
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">Chat Room</h1>
      <form className="chat-form" onSubmit={handleSubmit}>
        <label className="chat-label">
          Enter your username:
          <input type="text" value={username} onChange={handleUsernameChange} className="chat-input" />
        </label>
        <button type="submit" className="chat-button">Login</button>
      </form>
    </div>
  );
};

export default ChatPage;
