const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const POST_PATH = path.join('/uploads/users/post')
const postSchema = mongoose.Schema({
    description:{
     type:String,
     require:true
    },
   image:{
     type:String
   }
   ,caption:{
    type:String,
   },
   signup:{
    type:mongoose.Schema.Types.ObjectId,
    // us database ka name jise refer kar rahe ho (database me jo naam diya h wo wala)
    ref:'Client'
   }

})
let storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,path.join(__dirname,'..',POST_PATH));
  },
  filename:function(req,file,cb){
    cb(null,Date.now()+'-'+file.originalname)
  }
})


// static methods 
// single me wo name aayega jo form.append me as a key use kra h image ke liye
postSchema.statics.uploadPost=multer({storage:storage}).single('image');
postSchema.statics.postPath=POST_PATH;
const Post = mongoose.model('Post',postSchema);
module.exports=Post;