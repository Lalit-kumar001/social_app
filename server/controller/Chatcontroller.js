
const Client = require('../modals/signup');
const Chat = require('../modals/chatModal');
const Message = require('../modals/messageModel');


// controller for search user to chat 
module.exports.searchResult = async function(req,res){
    const search = req.query.search;
    const keyword = search?{
     $or:[
        {firstname:{$regex : search , $options:'i' }},
        {lastname:{$regex : search , $options:'i'}},
        {email:{$regex : search , $options:'i'}}
     ]
    }:{}

    const users = await Client.find(keyword).find({_id:{$ne: req.user._id}});
    return res.status(200).send({
        success: true,
        message: 'search retrive successfully',
        users:users
    });
    // res.send(users);
}





///particular user ke sath chat access karne ke liye 

module.exports.particularChats = async function (req, res) {
    const { userId } = req.body;
  
    if (!userId) {
      console.log('userId is not seen');
      res.sendStatus(400);
    }
  console.log(userId);
  console.log(req.user._id);

//   ye tarika kaam nhi kra 
    // var isChat = await Chat.find({
    //   $and: [
    //     { users: { $elemMatch: { $eq: req.user._id } } },
    //     { users: { $elemMatch: { $eq: req.userId } } },
    //   ],
    // })


  var isChat = await Chat.find({
   users: { $all: [userId,req.user._id]}
  })
  .populate("users","-password -confirm_password")
      .populate("latestMessage");

    
    isChat = await Client.populate(isChat, {
      path: "latestMessage.sender",
      select: "firstname avatar email",
    });
    console.log(isChat.users);
    // console.log(isChat);
  
    if (isChat.length > 0) {
      res.send(isChat[0]);
      console.log('already');
    } else {
      try {
        var chatData = {
          chatName: "sender",
          isGroupChat: false,
          users: [req.user._id, userId],
        };
  
        const createdChat = await Chat.create(chatData);
        // Move the FullChat declaration outside the try block
        let FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        console.log(isChat);
        res.status(200).json(FullChat);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    }
  };
  

//history---> jis jis se userv ne chat kar rajhi hai wo puri ek list rreturn krenge 
module.exports.history = async  function(req,res){
    console.log('history')
//har document ki users array me check kar rahe hai ki kya loggedin user ki id hai? agar hai to mtlv usee loggedin user ne chat kari hogi

// isfunctin me then wale tarike ka use kar rahe hai 
try{
    Chat.find({users:{$elemMatch:{$eq:req.user._id}}})
    .populate("users","-password -confirm_password")
    .populate("latestMessage")
    .sort({updatedAt:-1})
    .then(async (results)=>{
        results = await Client.populate(results,{
            path:"latestMessage.sender",
            select:"firstname avatar email"
        });
        // res.status(200).send(results);
         res.status(200).send(results);
    })
}
catch(error){
    res.status(400);
    throw new Error(error.message);
}
    }
//message jo send karenge uska controller
module.exports.sendMessage = async function(req,res){
  const {content , chatId } = req.body;
  if(!content||!chatId){
    console.log("invalid data passed")
    return res.sendStatus(400);
  }

  //new message ki feild bhari  
  var newMessage = {
    sender:req.user._id,
    content:content,
    Chat:chatId
  }

  // message modal me ek document create kr diya 
 var message = await Message.create(newMessage);

//  ab is message ko populate karna hai
try {
  message =await message.populate('sender',"name pic");
  message =await message.populate('Chat');

  message = await Client.populate(message,{
    path:'Chat.users',
    select: "firstname avatar email"
  })

  // jis chat par ye message bhej rahe hai us chatid ki latestmessage ki feild ko change kar rahe hai newMessage se   
  await Chat.findByIdAndUpdate(req.body.chatId,{
    latestMessage:message,
  })
console.log(message)
  res.send(message);

} catch (error) {
  res.status(400);
  // console.log('error in sending message ');
  throw new Error(error.message);
}

}

// fetch all messages for particular chat 

module.exports.fetchAllMessages = async function(req,res){
  try {
    const messages = await Message.find({Chat:req.params.chatId})
    .populate("sender", "firstname avatar email")
    .populate("Chat")
    res.json(messages)
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
}
