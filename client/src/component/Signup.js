import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../styles/client.css'


function Signup() {
 const [formData,setFormData]=useState({
  firstname:'',
  lastname:'',
  email:'',
  password:'',
  zip:'',
  city:'',
  confirmpassword:'',
  // Add the necessary fields for file upload
  image:'',
 });
 const navigate = useNavigate();
 const handleChange=(e)=>{
  const { name, value, type, files } = e.target;

    // Check if the input is a file type (for image upload)
    const inputValue = type === 'file' ? files[0] : value;

    setFormData({ ...formData, [name]: inputValue });
  
 }
//  const handleFileChange =(e)=>{
//   setFormData({...form,image:e.target.files[0]});
// }

  const handleSubmit= async(e)=>{
    e.preventDefault();
    const form = new FormData();
    form.append('firstname',formData.firstname);
    form.append('lastname',formData.lastname);
    form.append('email',formData.email);
    form.append('password',formData.password);
    form.append('zip',formData.zip);
    form.append('city',formData.city);
    form.append('avatar',formData.image);
    form.append('confirmpassword',formData.confirmpassword)
    try{
       // Send form data to the server
      const response = await axios.post('http://localhost:5000/user/create',form);
      console.log('response',response.data);
      // const data=response.json();

      if (response.data && !response.data.success) {
        toast.error('Password should be equal to confirm password!!');
        // navigate('/');
      } else if (response.data && response.data.success) {
        toast.success('Successfully registered');
        navigate('/signin');
      }
    }
catch(error){
  console.log('error in submission',error);
}
  }
 
  return (
<>
<h1 className="sign-up">
SIGN-UP
</h1>
<div className='client-form'>
    <form className="row g-4 needs-validation" noValidate onSubmit={handleSubmit} enctype="multipart/form-data" method="POST">
      <div className="col-md-4">
        <label htmlFor="validationCustom01" className="form-label">
          First name
        </label>
        <input
          type="text"
          className="form-control"
          id="validationCustom01"
          name="firstname"
          defaultValue="Mark"
          required
          onChange={handleChange}
        />
        <div className="valid-feedback">Looks good!</div>
      </div>
      <div className="col-md-4">
        <label htmlFor="validationCustom02" className="form-label">
          Last name
        </label>
        <input
          type="text"
          className="form-control"
          name="lastname"
          id="validationCustom02"
          defaultValue="Otto"
          required
          onChange={handleChange}
        />
        <div className="valid-feedback">Looks good!</div>
      </div>
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
            required
            onChange={handleChange}
          />
          <div className="invalid-feedback">Please choose a username.</div>
        </div>
      </div>
      <div className="col-md-6">
        <label htmlFor="validationCustom03" className="form-label">
          City
        </label>
        <input
          type="text"
          name="city"
          className="form-control"
          id="validationCustom03"
          required
          onChange={handleChange}
        />
        <div className="invalid-feedback">Please provide a valid city.</div>
      </div>
      <div className="col-md-6">
        <label htmlFor="validationCustom03" className="form-label">
          Profile Pic 
        </label>
        <input type="file" 
        className="form-control"
        name="image" 
       onChange={handleChange}
        required />
        {/* onChange={handleFileChange} */}

        <div className="invalid-feedback">Please provide a valid city.</div>
      </div>
        {/* <button  onClick={handleFileUpload} >Upload</button> */}

      <div className="col-md-6">
        <label htmlFor="validationCustom03" className="form-label">
          password
        </label>
        <input
          type="password"
          name="password"
          className="form-control"
          id="validationCustom03"
          required
          onChange={handleChange}
        />
        <div className="invalid-feedback">Please provide a valid city.</div>
      </div>
      <div className="col-md-6">
        <label htmlFor="validationCustom03" className="form-label">
          Confirm password
        </label>
        <input
          type="password"
          name="confirmpassword"
          className="form-control"
          id="validationCustom03"
          required
          onChange={handleChange}
        />
        <div className="invalid-feedback">Please provide a valid city.</div>
      </div>
      
      <div className="col-md-3">
        <label htmlFor="validationCustom05" className="form-label">
          Zip
        </label>
        <input
          type="text"
          name="zip"
          className="form-control"
          id="validationCustom05"
          required
          onChange={handleChange}
        />
        <div className="invalid-feedback">Please provide a valid zip.</div>
      </div>
      <div className="col-12">
        
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

export default Signup;
