// ChatUI.js
import React from 'react';
import { ChatState } from '../../context/chatprovider';
const SingleMessage = ({ singleMessage }) => {

    const { user , setUser} =  ChatState(); 
  // Use the selectedChat data to render the chat UI
  return (
<>
{/* agar sender ki id equal ogi logged in user ki id ke to use .single-message.sender class denge otherwise .single-message.receiver */}
<li className={`single-message-${singleMessage.sender._id === localStorage.getItem("id") ?  'sender':'receiver' }`}>
{singleMessage.content}
</li>
</>
  );
};

export default SingleMessage;
