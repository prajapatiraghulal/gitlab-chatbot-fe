
import React from 'react';
import './Message.css';

function Message({ content, sender, createdOn }) {
  return (
    <div className={`message ${sender}`}>
      <div className="message-content">
        <p>{content}</p>
        <small>{new Date(createdOn).toLocaleString()}</small>
      </div>
    </div>
  );
}

export default Message;
