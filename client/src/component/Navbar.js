

// import React from 'react';
// import profileImage from '../images/profile.png';
// import '../styles/nav.css';

// function Nav(props) {
//   return (
//     <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
//       <div className="container-fluid nav-color">
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarText"
//           aria-controls="navbarText"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarText">
//           <a className="navbar-brand logo" aria-current="page" href="#">
//             TIFF
//           </a>
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0 mg-l">
//             <li className="nav-item">
//               <a className="nav-link nav-text" aria-current="page" href="/home">
//                 Home
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link nav-text" href="/about">
//                 About
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link nav-text" onClick={props.logout}>
//                 Contact Us
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link nav-text" href="/chat">
//                 Chats
//               </a>
//             </li>
//           </ul>

//           <div className="authentication-links">
//             {props.loggedIn ? (
//               <div className="profile-image-container">
//                 <img
//                   src={localStorage.getItem('avatar') || profileImage}
//                   alt="Profile"
//                   className="profile-image"
//                 />
//               </div>
//             ) : (
//               <>
//                 <a className="navbar-brand" href="/signin">
//                   SIGNIN
//                 </a>
//                 <a className="navbar-brand" href="/signup">
//                   SIGNUP
//                 </a>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Nav;

import React, { useState } from 'react';
import profileImage from '../images/profile.png';
import '../styles/nav.css';

function Nav(props) {
  const [showLogout, setShowLogout] = useState(false);

  const toggleLogout = () => {
    console.log("cliked");
    
    setShowLogout(!showLogout);
  };

  const handleLogout = () => {
    props.logout();
    setShowLogout(false);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid nav-color">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <a className="navbar-brand logo" aria-current="page" href="#">
            TIFF
          </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mg-l">
          <li className="nav-item">
              <a className="nav-link nav-text" aria-current="page" href="/home">
                Home
              </a>
       </li>
        <li className="nav-item">
                <a className="nav-link nav-text" href="/about">
                About
               </a>
             </li>
            <li className="nav-item">
           <a className="nav-link nav-text" href="/contact">
               Contact Us
               </a>
            </li>
             <li className="nav-item">
               <a className="nav-link nav-text" href="/chat">
                Chats
             </a>
            </li>

            {showLogout && (
                <div className="logout-popup">
                   <button className="logout-button" onClick={handleLogout}>
                     Logout
                   </button>
                 </div>
                 )}
          </ul>

          <div className="authentication-links">
            {props.loggedIn ? (
              <div className="profile-image-container" onClick={toggleLogout}>
                <img
                onClick={toggleLogout}
                  src={localStorage.getItem('avatar') || profileImage}
                  alt="Profile"
                  className="profile-image"
                />
                
                {/* {showLogout && (
                <div className="logout-popup">
                   <button className="logout-button" onClick={handleLogout}>
                     Logout
                   </button>
                 </div>
                 )} */}
              </div>
            ) : (
              <>
                <a className="navbar-brand" href="/signin">
                  SIGNIN
                </a>
                <a className="navbar-brand" href="/signup">
                  SIGNUP
                </a>


              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;


