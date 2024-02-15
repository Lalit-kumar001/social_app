import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate, // Import Navigate here
} from 'react-router-dom';
import Nav from './component/Navbar';
// import ClientForm from './component/Signup';
import Signup from './component/Signup';
// import SignIn from './component/Signin';
import ClientForm from './component/Signin';
import About from './component/About';
import { Toaster } from 'react-hot-toast';
import Home from './component/Home';
import InstagramPostContainer from './component/try'
import CreatePost from './component/Createpost';
import Chat from './component/Chatpage/Chatting';
import { ChatState } from './context/chatprovider';
import Contact from './component/Contact';
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const {user , setUser , id , setId}  = ChatState()
  useEffect(() => {
    // Check if there's a token in localStorage
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      // Token found, consider the user as authenticated
      setLoggedIn(true);
    }
  },[]); // Empty dependency array ensures that this effect runs once, similar to componentDidMount

  const setProfile = (token,avatar,idd) => {
    // Save the token in localStorage
    console.log(token);
    localStorage.setItem('authToken', token);
    localStorage.setItem('avatar', avatar);
    localStorage.setItem('id', idd);
   console.log(localStorage.getItem('id'))
    setLoggedIn(true);
  };
  const logout = () => {
    // Clear the token from localStorage on logout
    localStorage.removeItem('authToken');
    localStorage.removeItem('avatar');
    localStorage.removeItem('id');
   console.log(id)
    setLoggedIn(false);
  };


  console.log("outside useeffect" ,loggedIn);
  return (
    
    <div className="App">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <Router>
       
        <Nav loggedIn={loggedIn} logout={logout} />
      
        {/* <InstagramPostContainer/> */}
        {/* <InstagramPostContainer/> */}

        <Routes>
        <Route path="/create-post" element={loggedIn ? <CreatePost loggedIn={loggedIn}/> : <Navigate to="/signin" />} />
          <Route path="/chat" element={localStorage.getItem('authToken') ? <Chat /> : <Navigate to="/signin" />} />
          <Route path="/home" element={localStorage.getItem('authToken') ? <Home loggedIn={loggedIn}/> : <Navigate to="/signin" />} />
          <Route path="/contact" element={localStorage.getItem('authToken') ? <Contact /> : <Navigate to="/signin" />} />

          <Route path="/about" element={localStorage.getItem('authToken') ? <About /> : <Navigate to="/signin" />} />
          <Route path="/signin" element={<ClientForm loggedIn={loggedIn} setProfile={setProfile} />} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
