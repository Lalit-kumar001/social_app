import React, { createContext, useContext, useEffect, useState } from "react";
  const ChatContext = createContext(null);

 const Chatprovider = ({children}) =>{
    const [selectedChat,setSelectedChat] = useState();
    const [chats , setChats] = useState();
    const [user, setUser] = useState([]);
   const  [selectedUser,setSelectedUser] = useState(null);
    const [id , setId] = useState();
    const [totalChats , setTotalChats] = useState();
    const [idFromHome,setIdFromhome] = useState(null);
    // const [totalChats , setTotalChats] = useState();
    return(
    <ChatContext.Provider
        value={{
            selectedChat,
            setSelectedChat,
            chats,
            setChats,
            totalChats,
            setTotalChats,
            user,
            id,
            setId,
            selectedUser,
            setSelectedUser,
            setUser,
            idFromHome,
            setIdFromhome
        }}
        >
        {children}
    </ChatContext.Provider>
    )
 };
// context ko kisi bhi file me is name ke through karrenge 
export const ChatState = () => {
    return useContext(ChatContext);
  };

 export default Chatprovider;