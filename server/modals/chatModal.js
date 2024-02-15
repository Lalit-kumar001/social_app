// ek chat me kya kya hota hai wo sab modal me include karna hai 

const mongoose = require('mongoose');

const chatModal = mongoose.Schema(
    {
        chatName:{
            type:String,
            trim:true
        },
        isGroupChat:{
            type:Boolean,
            default:false
        },

        // har document me user feild ek array hai jisme hamesa 2 users ki hi user id hogi sender reciever 
        // users:[sender,receiver ]
        users:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Client'

        }],
        latestMessage: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Message'
        },
    },{
        timestamps:true,
    }
)

const Chat = mongoose.model('Chat',chatModal);
module.exports = Chat;