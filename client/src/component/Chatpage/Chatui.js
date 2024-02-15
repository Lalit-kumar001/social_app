// ChatUI.js
import React from 'react';

const ChatUI = ({ selectedChat }) => {
  // Use the selectedChat data to render the chat UI
  return (
    <div className="chat-ui">
      {/* Your chat UI content goes here */}
      <h2>{selectedChat ? `Chat with ${selectedChat.chatName}` : 'No chat selected'}</h2>
      {/* Add chat messages, input box, etc. */}
    </div>
  );
};

export default ChatUI;
