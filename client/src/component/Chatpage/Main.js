// Main.js
import React, { useState, useEffect, useContext ,useRef } from 'react';
import './ChatpageCss/Main.css';
import Chats from './Chats';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ShowResult from './Showsearchresult';
import ChatUI from './Chatui'
// import  {ChatState}  from '../../context/chatprovider';
import { ChatState } from '../../context/chatprovider';
import Showhistory from './Showhistory';
import SingleMessage from './Singlemessage';
import UserInfo from './Userinfo';
import Left from './leftpart'
import io from 'socket.io-client'
import ShowResultmobile from'./ShowResultmobile'
import Showhistorymobile from './Showhistorymobile';
// import {ChatContext} from '../../context/chatprovider'



function Main() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
const { setSelectedChat,selectedChat, chats, setChats ,user ,id ,selectedUser,setSelectedUser,idFromHome,setIdFromhome} =  ChatState();

  // console.log(localStorage.getItem('id'))
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [result,setResult] = useState([]);
  const [loadingChat,setLoadingChat] = useState(false);
  const [newMessage , setNewMessage] = useState('');
  const [messages , setMessages] = useState([])
 const [socketConnected , setSocketConnected] = useState(false);
 const [chatClicked,setChatClicked] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

   

    // Attach the event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  //context se data le raha 
//context se data le raha 
// const { setSelectedChat, chats, setChats } =  useContext(ChatContext);
// const ENDPOINT = "http://localhost:5000";
var socket = io('http://172.20.20.240:5000');
var   selectedChatCompare;
// console.log(id)
// useref ek hook hai dom ko diectly manululate karne ke liye 
// msgBoxRef me us element ka ref dalenge jise manupulate karna hai 
// msgBoxRef.current ek key hoti hai jiski value hoti hai his element ka is pr ref hai 
// msgBoxRef.current:<div id=​"msg-box">​<ul id=​"single-msg-ul">​…​</ul>​flex</div>​

const msgBoxRef = useRef();
const msgBoxRefMobile = useRef();

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

// function to send message 
  const sendMessage = async function(event){
    if(event.key==='Enter' && newMessage){
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        };
        setNewMessage('')
        const response = await axios.post('http://localhost:5000/user/sendmessage',{content:newMessage,chatId:selectedChat},config)
        // console.log(response);
        
        socket.emit("new message", response.data);
        setMessages([...messages , response.data])
        // console.log(messages);
      }
       catch (error) {
        toast.error('Error in Send Message');
      }
    }
    }

  useEffect(()=>{
    // socket = io('http://172.20.20.240:5000');
    // io(ENDPOINT);
    socket.emit("setup",localStorage.getItem('id'));
   
    //server se connected emit hoga use listen karega
    socket.on("connected",()=>setSocketConnected(true));
    // accessChat(idFromHome)
   
     },[])





     useEffect(()=>{
      fetchAllMessage();
      //socket.io ke liye h 
      selectedChatCompare=selectedChat
    },[selectedChat])


  useEffect(() => {
    fetchedChat();
  },[]);


  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare !== newMessageRecieved.chat._id
      ) {
        // if (!notification.includes(newMessageRecieved)) {
        //   setNotification([newMessageRecieved, ...notification]);
        //   setFetchAgain(!fetchAgain);
        // }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });
  

  // useEffect(()=>{
  //   if(idFromHome){
  //     console.log('id',idFromHome);
  //     accessChat(idFromHome);
  //     setIdFromhome(null);
  //     // if(screenWidth > 657 ){
  //     //   accessChat(idFromHome);
  //     // }
  //     // else{
  //     //   accessChatMobile(idFromHome);
  //     // }
  //   }
  //   },[])

  // useEffect(() => {
  //   // Scroll to the bottom of the message box when messages change
  //   scrollToBottom();
  //   scrollToBottomMobile();

  // }, [messages]);


  
  const scrollToBottom = () => {
    // console.log(msgBoxRef.current)
    // scrolling the element to its maximum height 
    msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
  };


  const scrollToBottomMobile = () => {
    // console.log(msgBoxRef.current)
    // scrolling the element to its maximum height 
    msgBoxRefMobile.current.scrollTop = msgBoxRefMobile.current.scrollHeight;
  };


// fetch all messages of selected chat for ui 

const fetchAllMessage = async function(){
  if(!selectedChat){
    return ;
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    };
    const response = await axios.get(`http://localhost:5000/user/allmessage/${selectedChat}`,config);
    setMessages(response.data);
    socket.emit("join chat", selectedChat);
  } catch (error) {
    
  }
}


// typing karne par jo function call hoga 
const typingHandler = async function(event){
  setNewMessage(event.target.value)
}

// mobile ke liye alag access chat function jisme chatClicked ko true karna hai 
const accessChatMobile = async (userId)=>{
  setChatClicked(true)
  //  console.log(userId)
try{
  setLoadingChat(true);
  const config = {
      headers: {
          "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    };
  const response = await axios.post('http://localhost:5000/user/particularchat',{userId},config);
  const data = response.data;
  // console.log(response)
  if (!chats.find((c) => c._id === data._id)){
      setChats([...chats,data]);
      // console.log(chats.users)
  }

  //ye variable us chat ke liye h jo current chat dikhayega
  // console.log(response.data._id);
  setSelectedChat(response.data._id);
  // setSelectedChat(response.data);

  setSelectedUser(data);
  console.log(selectedChat,"jhjjhbjdxhjsxn")
  console.log(selectedUser,"jhjjhbjdxhjsxn")
//taki history update ho jaye
  fetchedChat();
}
catch(error){
  toast.error('Error in access chat');
}
}





// function jo kisi particular user ke sath hamari chat aceess ya create karne ke liye hai 
const accessChat= async (userId)=>{
   
 console.log(userId)
try{
    setLoadingChat(true);
    const config = {
        headers: {
            "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      };
    const response = await axios.post('http://localhost:5000/user/particularchat',{userId},config);
    const data = response.data;
    // console.log(response)
    if (!chats.find((c) => c._id === data._id)){
        setChats([...chats,data]);
        // console.log(chats.users)
    }

    //ye variable us chat ke liye h jo current chat dikhayega
    // console.log(response.data._id);
    setSelectedChat(response.data._id);
    // setSelectedChat(response.data);

    setSelectedUser(data);
    console.log(selectedChat,"jhjjhbjdxhjsxn")
    console.log(selectedUser,"jhjjhbjdxhjsxn")
//taki history update ho jaye
    fetchedChat();
}
catch(error){
    toast.error('Error in access chat');
}
}


//function jo user ki sari chats dikhyega kis ki ke sath ho rakhi hai left part me 

const fetchedChat= async ()=>{
    //  console.log('i am clicked ')
    try{
        const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          };
        const response = await axios.get('http://localhost:5000/user/history',config);
        setChats(response.data);
        // setTotalChats(...totalChats , )
        // console.log(chats, "hbhbhb");
    }
    catch(error){
        toast.error('Error in fetched chat');
    }
    }


    ///////
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form submission

    if (!search) {
      toast.error('Please Enter Something in Search');
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      };

      const response = await axios.get(`http://localhost:5000/user/searched?search=${search}`, config);
      setResult(response.data.users);
      } catch (error) {
      toast.error('Error');
    }
  };

  const toggleDrawer = (event) => {
    setDrawerOpen(false);
    setResult([])

  };

  const searchDrawer = (event) => {
    event.stopPropagation();
    setDrawerOpen(true);
  };

//   return (



// <>
//     {screenWidth > 657 ? (
//     <div className="main-container">



// {/* common mistake   .map((user)=>{}ye nhi hota  .map((user)=>() ye hota hai )*/}
//       {/* Left Part */}
//       {/* <div className="left-part" onClick={toggleDrawer}>
//         <button id="search-button" onClick={searchDrawer}>
//           <span>&#128269;</span> Search Here
//         </button>
//         {/* {chats?.map((chat)=>{ */}
//               {/* <Showhistory key={chat._id} user={chat.users[1]} handleFunction={() => accessChat(chat.users[1]._id)}/> */}
//         {/* })} */}
       
//       {/* </div> */} 





//       {/* Left Part */}


// <div className="left-part" onClick={toggleDrawer}>
//   <button id="search-button" onClick={searchDrawer}>
//     <span>&#128269;</span> Search Here
//   </button>
//   {chats?.map((chat) => (
// <Showhistory
//   key={chat._id}
//   User={`${chat.users[0]._id === localStorage.getItem('id') ? localStorage.getItem('id') : ''}`}
//   users={chat.users}
//   handleFunction={() => accessChat(chat.users[1]._id)}
// /> 

//     // <Showhistory key={chat._id} User={chat.users[1]} handleFunction={() => accessChat(chat.users[1]._id)}/>
//   ))}
// </div>


//       {/* Side Drawer */}
//       <div className={`side-drawer ${isDrawerOpen ? 'open' : ''}`}>
//         {/* Input Container */}
//         <form className="input-container" >
//           <input type="text" placeholder="Search for a user" onChange={handleChange} />
//           <button type="submit" className="go-button" onClick={handleSearch}>
//             Go
//           </button>
//         </form>


// {/* //yaha pr result ko isliye check kar raha hu kyo ki immediate update nahi ho raha result jaise useeffect me ho jata tha  */}
//         {result?.map((user)=>(

//              //show result ek se zada baar call hoga to aise me function is trh pass karte h reaason---> todo
//             // <ShowResult key={user.id} user={user} accessChat={accessChat(user.id)} />
//             <ShowResult key={user.id} user={user}   handleFunction={() => accessChat(user._id)} />
//         ))}
//       </div>

//       {/* Right Part */}
//       <div className="right-part" onClick={toggleDrawer}>
//         {/* <ChatUI selectedChat={selectedChat} /> */}
//        {/* all messages  */}
//       <div  id='msg-box' >  

//       {/* <UserInfo  User={`${selectedUser.users[0]._id === localStorage.getItem('id') ? localStorage.getItem('id') : ''}`}
//         users={selectedUser.users} /> */}
//       {selectedUser && selectedUser.users && selectedUser.users.length > 0 && (
//     <UserInfo
//     key={selectedUser._id}
//     User={`${selectedUser.users[0]._id === localStorage.getItem('id') ? localStorage.getItem('id') : ''}`}
//     users={selectedUser.users}
//   />
// )}
//         <ul id='single-msg-ul' ref={msgBoxRef}>
//           {messages?.map((singleMessage)=>(
//            <SingleMessage  singleMessage={singleMessage}  />
//           ))}
    
//         </ul>
//       </div>


//         <div id='input-box'>
//           {selectedChat?
//       ( <input placeholder='Enter message' onKeyDown={sendMessage}  value={newMessage}
//                 onChange={typingHandler}></input>):(<p></p>)

//           }
//         </div>
//       </div>
//     </div>) : 
//     (
//       // Render something when screenWidth is not greater than 657
//       // You may need to replace 'SomeComponent' with the component you want to render
//       chatClicked ? 
//     (  {/* Right Part */}
//       <div className="right-part" onClick={toggleDrawer}>
//        {/* all messages  */}
//       <div  id='msg-box' >  
//       {selectedUser && selectedUser.users && selectedUser.users.length > 0 && (
//     <UserInfo
//     key={selectedUser._id}
//     User={`${selectedUser.users[0]._id === localStorage.getItem('id') ? localStorage.getItem('id') : ''}`}
//     users={selectedUser.users}
//   />
// )}
//         <ul id='single-msg-ul' ref={msgBoxRef}>
//           {messages?.map((singleMessage)=>(
//            <SingleMessage  singleMessage={singleMessage}  />
//           ))}
    
//         </ul>
//       </div>


//         <div id='input-box'>
//           {selectedChat?
//       ( <input placeholder='Enter message' onKeyDown={sendMessage}  value={newMessage}
//                 onChange={typingHandler}></input>):(<p></p>)

//           }
//         </div>

//       </div>): null
//     )}
    
// </>
//   );
 

// another return 

// return (
//   <>
//     {screenWidth > 657 ? (
//       // Render when screenWidth is greater than 657
//       <div className="main-container">
//         {/* Left Part */}
//         <div className="left-part" onClick={toggleDrawer}>
//           <button id="search-button" onClick={searchDrawer}>
//             <span>&#128269;</span> Search Here
//           </button>
//           {chats?.map((chat) => (
//             <Showhistory
//               key={chat._id}
//               User={`${chat.users[0]._id === localStorage.getItem('id') ? localStorage.getItem('id') : ''}`}
//               users={chat.users}
//               handleFunction={() => accessChat(chat.users[1]._id)}
//             />
//           ))}
//         </div>

//         {/* Side Drawer */}
//         <div className={`side-drawer ${isDrawerOpen ? 'open' : ''}`}>
//           {/* Input Container */}
//           <form className="input-container">
//             <input type="text" placeholder="Search for a user" onChange={handleChange} />
//             <button type="submit" className="go-button" onClick={handleSearch}>
//               Go
//             </button>
//           </form>

//           {/* Result */}
//           {result?.map((user) => (
//             <ShowResult key={user.id} user={user} handleFunction={() => accessChat(user._id)} />
//           ))}
//         </div>

//         {/* Right Part */}
//         <div className="right-part" onClick={toggleDrawer}>
//           <div id='msg-box'>
//             {selectedUser && selectedUser.users && selectedUser.users.length > 0 && (
//               <UserInfo
//                 key={selectedUser._id}
//                 User={`${selectedUser.users[0]._id === localStorage.getItem('id') ? localStorage.getItem('id') : ''}`}
//                 users={selectedUser.users}
//               />
//             )}
//             <ul id='single-msg-ul' ref={msgBoxRef}>
//               {messages?.map((singleMessage) => (
//                 <SingleMessage singleMessage={singleMessage} />
//               ))}
//             </ul>
//           </div>

//           <div id='input-box'>
//             {selectedChat ? (
//               <input
//                 placeholder='Enter message'
//                 onKeyDown={sendMessage}
//                 value={newMessage}
//                 onChange={typingHandler}
//               ></input>
//             ) : (
//               <p></p>
//             )}
//           </div>
//         </div>
//       </div>
//     ) : (
//       // Render something when screenWidth is not greater than 657
//       // You may need to replace 'SomeComponent' with the component you want to render
//       chatClicked ? (
//         // Right Part for chatClicked
//         <div className="right-part" onClick={toggleDrawer}>
//           <div id='msg-box'>
//             {selectedUser && selectedUser.users && selectedUser.users.length > 0 && (
//               <UserInfo
//                 key={selectedUser._id}
//                 User={`${selectedUser.users[0]._id === localStorage.getItem('id') ? localStorage.getItem('id') : ''}`}
//                 users={selectedUser.users}
//               />
//             )}
//             <ul id='single-msg-ul' ref={msgBoxRef}>
//               {messages?.map((singleMessage) => (
//                 <SingleMessage singleMessage={singleMessage} />
//               ))}
//             </ul>
//           </div>

//           <div id='input-box'>
//             {selectedChat ? (
//               <input
//                 placeholder='Enter message'
//                 onKeyDown={sendMessage}
//                 value={newMessage}
//                 onChange={typingHandler}
//               ></input>
//             ) : (
//               <p></p>
//             )}
//           </div>
//         </div>
//       ) : 

// (

// <div className='mobile-chat-history'>
// <div className="left-part" onClick={toggleDrawer}>
//           <button id="search-button" onClick={searchDrawer}>
//             <span>&#128269;</span> Search Here
//           </button>
//           {chats?.map((chat) => (
//             <Showhistorymobile
//               key={chat._id}
//               User={`${chat.users[0]._id === localStorage.getItem('id') ? localStorage.getItem('id') : ''}`}
//               users={chat.users}
//               handleFunction={() => accessChatMobile(chat.users[1]._id)}
//             />
//           ))}
//         </div>

// {/* Side Drawer */}
// <div className={`side-drawer ${isDrawerOpen ? 'open' : ''}`}>
//           {/* Input Container */}
//           <form className="input-container">
//             <input type="text" placeholder="Search for a user" onChange={handleChange} />
//             <button type="submit" className="go-button" onClick={handleSearch}>
//               Go
//             </button>
//           </form>

//           {/* Result */}
//           {result?.map((user) => (
//             <ShowResultmobile key={user.id} user={user}  handleFunction={() => accessChatMobile(user._id)} />
//           ))}
//         </div>

// </div>




// )



//     )}
//   </>
// );

// one more return 


  // ... (previous code)

  return (
    <>
      {screenWidth > 657 ? (
        // Render when screenWidth is greater than 657
        <div className="main-container">
          {/* Left Part */}
          <div className="left-part" onClick={toggleDrawer}>
            <button id="search-button" onClick={searchDrawer}>
              <span>&#128269;</span> Search Here
            </button>
            {chats?.map((chat) => (
              <Showhistory
                key={chat._id}
                User={`${chat.users[0]._id === localStorage.getItem('id') ? localStorage.getItem('id') : ''}`}
                users={chat.users}
                handleFunction={() => accessChat(chat.users[1]._id)}
              />
            ))}
          </div>

          {/* Side Drawer */}
          <div className={`side-drawer ${isDrawerOpen ? 'open' : ''}`}>
            {/* Input Container */}
            <form className="input-container">
              <input type="text" placeholder="Search for a user" onChange={handleChange} />
              <button type="submit" className="go-button" onClick={handleSearch}>
                Go
              </button>
            </form>

            {/* Result */}
            {result?.map((user) => (
              <ShowResult key={user.id} user={user} handleFunction={() => accessChat(user._id)} />
            ))}
          </div>

          {/* Right Part */}
          <div className="right-part" onClick={toggleDrawer}>
            <div id='msg-box'>
              {selectedUser && selectedUser.users && selectedUser.users.length > 0 && (
                <UserInfo
                  key={selectedUser._id}
                  User={`${selectedUser.users[0]._id === localStorage.getItem('id') ? localStorage.getItem('id') : ''}`}
                  users={selectedUser.users}
                />
              )}
              <ul id='single-msg-ul' ref={msgBoxRef}>
                {messages?.map((singleMessage) => (
                  <SingleMessage singleMessage={singleMessage} />
                ))}
              </ul>
            </div>

            <div id='input-box'>
              {selectedChat ? (
                <input
                  placeholder='Enter message'
                  onKeyDown={sendMessage}
                  value={newMessage}
                  onChange={typingHandler}
                ></input>
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Render something when screenWidth is not greater than 657
        // You may need to replace 'SomeComponent' with the component you want to render
        chatClicked ? (
          // Right Part for chatClicked
          <div className="right-part" onClick={toggleDrawer}>
            <div id='msg-box'>
              {selectedUser && selectedUser.users && selectedUser.users.length > 0 && (
                <UserInfo
                  key={selectedUser._id}
                  User={`${selectedUser.users[0]._id === localStorage.getItem('id') ? localStorage.getItem('id') : ''}`}
                  users={selectedUser.users}
                />
              )}
              <ul id='single-msg-ul' ref={msgBoxRefMobile}>
                {messages?.map((singleMessage) => (
                  <SingleMessage singleMessage={singleMessage} />
                ))}
              </ul>
            </div>

            <div id='input-box'>
              {selectedChat ? (
                <input
                  placeholder='Enter message'
                  onKeyDown={sendMessage}
                  value={newMessage}
                  onChange={typingHandler}
                ></input>
              ) : (
                <p></p>
              )}
            </div>
          </div>
        ) : (
          // Mobile Chat History
          <div className='mobile-chat-history'>
            <div className="left-part" onClick={toggleDrawer}>
              <button id="search-button" onClick={searchDrawer}>
                <span>&#128269;</span> Search Here
              </button>
              {chats?.map((chat) => (
                <Showhistorymobile
                  key={chat._id}
                  User={`${chat.users[0]._id === localStorage.getItem('id') ? localStorage.getItem('id') : ''}`}
                  users={chat.users}
                  handleFunction={() => accessChatMobile(chat.users[1]._id)}
                />
              ))}
            </div>

            {/* Side Drawer */}
            <div className={`side-drawer ${isDrawerOpen ? 'open' : ''}`}>
              {/* Input Container */}
              <form className="input-container">
                <input type="text" placeholder="Search for a user" onChange={handleChange} />
                <button type="submit" className="go-button" onClick={handleSearch}>
                  Go
                </button>
              </form>

              {/* Result */}
              {result?.map((user) => (
                <ShowResultmobile key={user.id} user={user}  handleFunction={() => accessChatMobile(user._id)} />
              ))}
            </div>
          </div>
        )
      )}
    </>
  );
}

export default Main;
