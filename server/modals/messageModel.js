// ek chat me kya kya hota hai wo sab modal me include karna hai 

const mongoose = require('mongoose');

const messageModal = mongoose.Schema(
    {
       
       sender: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Client'
        },
        content:{
            type:String,
            trim:true
        },
        Chat:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Chat'
        },
    },{
        timestamps:true,
    }
)

const Message = mongoose.model("Message",messageModal);
module.exports = Message;