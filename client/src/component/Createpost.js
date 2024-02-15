import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
// import '../styles/Home.css'
import '../styles/CreatePost.css'; // Import your CSS file

const CreatePost = () => {
  const navigate = useNavigate();
const [form,setForm]=useState({
    image:'',
    description:'',
    caption:''
})

// image ko chd kar baki data ko set karega ye function
const handleChange =(e)=>{
   const {name,value} = e.target;
    setForm({...form,[name]:value});

}

//image ko set karega form usestate me 
const handleFileChange =(e)=>{
   setForm({...form,image:e.target.files[0]});
}



// function to submut form 
const handleFileUpload = async (e) => {
  e.preventDefault();
  try {

    //ek form data bana rahae hai taki apna data backend par bhej sake 
    const formData = new FormData();
    formData.append('image',form.image);
    formData.append('description', form.description);
    formData.append('caption', form.caption);


    //post request 
    const response = await axios.post('http://localhost:5000/user/uploadPost', formData
    ,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      console.log("Post created successfully!");
      navigate('/home');
      // You may want to redirect or update state after successful post creation
    } else {
      console.error("Failed to create post.");
    }
  } catch (error) {
    console.error("Error creating post:", error);
  }
};

  return (

    <div className="create-post-container">
      <h2>Create a New Post</h2>
      <form   id='create-post-form'   method="post" encType="multipart/form-data"> 
        <label htmlFor="image">Upload Picture:</label>
        <input type="file" id="image" name="post" onChange={handleFileChange} required />

        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" onChange={handleChange} required />

        <label htmlFor="caption">Caption:</label>
        <input type="text" id="caption" name="caption" onChange={handleChange} />

        <button id='create-post'type="button" onClick={handleFileUpload}>Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
