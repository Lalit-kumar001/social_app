import React, { useState, useEffect } from "react";
import '../styles/client.css'
import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../context/chatprovider';

function ClientForm(props) {
  const [loginData,setLoginData] = useState({
    email:'',
    password:''
  });

 
  //context provider se user le rahe hai jisme ham loggeduser ki id store karenge 
  const { user , setUser} =  ChatState();
 const [temp,setTemp] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    console.log(temp);
  }, [temp]); 


  const handleChange = (e)=>{
  const {name,value} =e.target;
  setLoginData({...loginData,[name]:value})
  }

  const handleSubmit= async(e)=>{
    e.preventDefault();
    try{
    const response = await axios.post('http://localhost:5000/user/login',loginData);

    if (response.data && !response.data.success) {
      toast.error('Invalid user or Password!!');
      // navigate('/');
    }
    else if (response.data && response.data.success) {
      toast.success('Successfully Logged in');
      // console.log(response.data.token);

      setUser(response.data)
      setTemp(response);
      props.setProfile(response.data.token,response.data.userData.avatar,response.data.userData._id);

      // console.log(response);
      // console.log(user);
      // console.log(temp);
      // Use navigate with the correct URL parameter concatenation
      navigate(`/home`);
  }
    }
    catch(error){
console.log(error);
    }
  }
  return (
<>
<h1 className="sign-up">
SIGN-IN
</h1>
<div className='client-form'>
    <form className="row g-4 needs-validation" noValidate onSubmit={handleSubmit} >
      <div className="col-md-4">
        <label htmlFor="validationCustomUsername" className="form-label">
          Email
        </label>
        <div className="input-group has-validation">
          <span className="input-group-text" id="inputGroupPrepend">@</span>
          <input
            type="email"
            name="email"
            className="form-control"
            id="validationCustomUsername"
            aria-describedby="inputGroupPrepend"
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">Please choose a username.</div>
        </div>
      </div>
      

      <div className="col-md-6">
        <label htmlFor="validationCustom03" className="form-label">
          password
        </label>
        <input
          type="text"
          name="password"
          className="form-control"
          id="validationCustom03"
          onChange={handleChange}
          required
        />
        <div className="invalid-feedback">Please provide a valid city.</div>
      </div>
      
      <div className="col-12">
        <button className="btn btn-primary" type="submit">
          Submit form
        </button>
      </div>
    </form>
    </div>
</>
    
  );
}

export default ClientForm;
