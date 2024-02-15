import React from "react";
import InstagramPostContainer from "./try";
import plusImage from '../images/plus.png';
import { useNavigate } from 'react-router-dom';

function Home(props) {
  const navigate = useNavigate();
      const createPost= ()=>{
                navigate('/create-post');
          }
  return (
    <div style={homeContainerStyle}>
      <div style={postsContainerStyle}>
        {/* {posts} */}
        <InstagramPostContainer />
      
      </div>
      <div style={createPostButtonStyle}  onClick={createPost}>
        Create Post
      </div>
    </div>
  );
}

const homeContainerStyle = {
  // background: 'linear-gradient(to right, #3498db, #e74c3c)', // Blue to Red gradient
  background: 'linear-gradient(to right, #e74c3c,yellow)',
  marginTop:'60px',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
};

const postsContainerStyle = {
  maxWidth: '600px',
  width: '100%',
  margin: 'auto',
  marginBottom: '20px',
  overflowY: 'auto',
};

const createPostButtonStyle = {
  background: 'linear-gradient(to right, #fd8369, green)',
  color: '#fff',
  padding: '15px',
  borderRadius: '8px',
  textAlign: 'center',
  cursor: 'pointer',
  width: '50%',
  maxWidth: '600px',
  margin: 'auto',
  marginTop: '20px',
  position: 'fixed',
  bottom: '0px',
  transition: 'background 0.3s ease-in-out',
  // transition: 'background 0.5s ease', // Smooth transition effect

  // Hover effect
  ":hover": {
    // background: 'linear-gradient(to right, green, red)', // Green to Red
    background: 'linear-gradient(to right, #2980b9, #5f4bd4)'
  },
};



export default Home;