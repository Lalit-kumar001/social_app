// ChatUI.js
import React, { useState ,useEffect} from 'react';
import './ChatpageCss/Userinfo.css'
const UserInfo = (props) => {
console.log(props)

    const [secondUser, setSecondUser] = useState();

    // Use useEffect to update the secondUser when props.users or props.Users change
    useEffect(() => {
      // Check if the first user's _id is equal to props.Users
      if (props.users[0]._id === props.User) {
        setSecondUser(props.users[1]);
      } else {
        setSecondUser(props.users[0]);
      }
    }, [props.users, props.Users]);
  
  return (

<div id="user-info-box">
<div className="profile-image-container">
                <img
                  src={secondUser ? secondUser.avatar :"No user Selected"}
                  alt="Profile"
                  className="profile-image"
                />
     </div>

  <h1 id='name'>{secondUser ? secondUser.firstname : 'No user selected'}</h1>
</div>


  );
};

export default UserInfo;
