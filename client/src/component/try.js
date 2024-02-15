

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChatState } from '../context/chatprovider';
import { useNavigate } from 'react-router-dom';


const InstagramPost = () => {
  const navigate = useNavigate();

const {idFromHome,setIdFromhome} =  ChatState();

  const [postData, setPostData] = useState(null);

  const openChat = async(id) =>{
    console.log('open-chat')
    await setIdFromhome(id);
    console.log(idFromHome);
    navigate('/chat');


  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('fetching data ')
        const response = await axios.get('http://localhost:5000/user/posts', {
        
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            // "Content-Type": "multipart/form-data",
          },
        });
        setPostData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  setIdFromhome(null);
    fetchData();
  }, []);


  return (
    <div>
      {postData &&
        postData.posts.map((post) => (
          <div key={post._id} style={containerStyle}>

            {/* header  style  */}
            <div style={headerStyle}>

              {/* profile image  */}
              <img
                src={post['signup'].avatar}
                alt="User Profile"
                style={profileImageStyle}
              />
              <div style={userInfoStyle}>
                <span style={usernameStyle}>{post['signup'].firstname}</span>
                <span style={locationStyle}> {post['signup'].city}</span>
              </div>
            </div>
            <img
              src={post.image}
              alt="Post"
              style={postImageStyle}
            />
            <div style={interactionBarStyle}>
              <div style={interactionIconsStyle}>
                {/* <button style={iconButtonStyle}>💬</button> */}
                {/* <button onClick={openChat(post['signup']._id)} style={msgButton}>Message </button> */}
                <button onClick={() => openChat(post['signup']._id)} style={msgButton}>
               Message
                </button>
  
              </div>
            </div>
            <div style={captionStyle}>
              <strong>{post['signup'].firstname}</strong> {post.caption}
            </div>
            <div style={commentsStyle}>
              <div>
                Des: {post.description}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

// Rest of your styles...

const containerStyle = {
  maxWidth: '600px',
  width: '100%', // Take full width on larger screens
  margin: 'auto',
  border: '1px solid #ddd',
  borderRadius: '8px',
  marginBottom: '10px',
  backgroundColor: 'black',
  overflow: 'hidden',
  borderBottom: '1px solid white', // Light white line between each post
};




//header style which contain profile image and location and all
const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '8px',
  borderBottom: '1px solid #ddd',
};


// profile image 
const profileImageStyle = {
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  marginRight: '8px',
};

// box which contain user name and locationn 
const userInfoStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const usernameStyle = {
  fontWeight: 'bold',
};

const locationStyle = {
  color: '#aaa',
  fontSize: '10px',
};

const postImageStyle = {
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
};

const interactionBarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px',
};

const interactionIconsStyle = {
  display: 'flex',
};

const iconButtonStyle = {
  background: 'transparent',
  border: 'none',
  fontSize: '18px',
  marginRight: '8px',
  cursor: 'pointer',
};

const bookmarkButtonStyle = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
};

const likesStyle = {
  fontWeight: 'bold',
  paddingLeft: '8px',
};

const captionStyle = {
  padding: '8px',
};

const commentsStyle = {
  padding: '8px',
};

const commentStyle = {
  marginBottom: '6px',
};
const msgButton={
backgroundColor:'transparent',
color:'white'
}
export default InstagramPost;