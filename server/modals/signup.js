const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');
const signUpSchema = new mongoose.Schema({
   firstname:{
    type:String,
    required:true,
   },

 lastname:{
    type:String,
    required:true,
   },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    city:{
        type:String,
        required:true,
       },
    
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required: true
    },
    zip:{
        type:Number,
        required:true,
       },
    avatar:{
        type:String,
       },
}, {
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null,  Date.now()+ '-'+file.fieldname );
    }
  });
// static
signUpSchema.statics.uploadedAvatar = multer({storage:  storage}).single('avatar');
signUpSchema.statics.avatarPath = AVATAR_PATH;

const Client = mongoose.model('Client', signUpSchema);

module.exports = Client;