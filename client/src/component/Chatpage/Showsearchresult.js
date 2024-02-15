// ShowResult.js
import React from 'react';
import './ChatpageCss/Showresult.css'; // Import your CSS file for styling

function ShowResult( props ) {
  // console.log(props.user.id)
  return (
    <div className="user-box" onClick={props.handleFunction}>
      {props.user && (
        <div key={props.user.id} className="profile-pic">
          {/* Assume user.profilePic is the URL of the profile picture */}
          <img src={props.user.avatar} alt="Profile" />
          <div className="user-info">
            <h3>{props.user.firstname}</h3>
            {/* Add other user information as needed */}
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowResult;
