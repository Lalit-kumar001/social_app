
import React, { useState, useEffect } from 'react';
import './ChatpageCss/Showresult.css';

function Showhistory(props) {
  const [secondUser, setSecondUser] = useState();

  useEffect(() => {
    if (props.users[0]._id === props.User) {
      setSecondUser(props.users[1]);
    } else {
      setSecondUser(props.users[0]);
    }
  }, [props.users, props.User]);

  return (
    <div className="user-box" onClick={props.handleFunction}>
      {secondUser && (
        <div key={secondUser._id} className="profile-pic">
          <img src={secondUser.avatar} alt="Profile" />
          <div className="user-info">
            <h3>{secondUser.firstname}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default Showhistory;
