const express= require('express');
const path = require('path'); 
const app = express();
const bodyParser = require('body-parser'); // Include body-parser
const cors = require('cors'); // Include cors
const db = require('./config/mongoose'); // Import the database connection
// const {requireSignIn} = require('./middleware/Awt.js');
const port =5000;
const multer = require('multer');
const { log } = require('console');

// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//__dirname->current directary ka path dega hame 
//path.join path join karega current directary ka build ke sath




// Apply the middleware globally
// app.use(requireSignIn);

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON and form data
app.use(express.json());

app.use(express.urlencoded());
// app.use(express.static(path.join(__dirname, '../client/tiffen/build')));


// '/uploads': This is the directory from which to serve the static files. So, any file inside the "uploads" directory will be accessible through the "/uploads" URL path

// /upload url aate hi express static uplkoad wale folder ko public kar dega jise hame pura path dene ki zarurat nahi hai image ki 
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use('/',require('./routes'));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/tiffen/build', 'index.html'));
// });

// ----------------------------deployement----------------------------
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// ----------------------------deployement----------------------------


const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });


  // ye line Socket.io ko initialize karta hai or use existing server se bind karta hai jo hamare case me hai http server 
  const io = require("socket.io")(server,
  // ye object hamare socket ka behaviour batata hai   
   {
    // agar itne time tak client se kuch nahi aaya to connection disconnect ho jayega 
    pingTimeout:60000,
    cors:{
      origin: "http://localhost:3000",
    }

  })
  // This is an event listener that triggers when a new client connects to the Socket.io server.
  io.on("connection",(socket)=>{
 console.log("connected to socket.io");
 // on se ham event listener banate h jo listen karega zab client is event ko trigger karega 
 socket.on("setup", (userId) => {
  socket.join(userId);
  socket.emit("connected");
});


socket.on("join chat",(room)=>{
  // socket represents an individual client's socket/connection
  // instructs the socket to join a specific room identified by the provided room parameter. 
  // This is useful for creating separate communication channels or "rooms."
  socket.join(room)
  console.log("User Join The Room: "+room);
});

socket.on("new message",(newMessageReceived)=>{
  var chat = newMessageReceived.Chat;

  if(!chat.users) return console.log("chat.users not defined");

  chat.users.array.forEach(user => {

// is for loop me check kar rahe hai ki khud ko bhi to nhi bhej rahe
    if(user._id==  newMessageReceived.sender._id) return;
    // This part specifies that the event should be sent to all sockets/clients that are in the room identified by user._id.
    socket.in(user._id.emit("message receved",newMessageReceived))
// This part emits the "message received" event to all clients in the specified room and sends the newMessageReceived data along with it.
  });
})



socket.off("setup", () => {
  console.log("USER DISCONNECTED");
  socket.leave(userId);
});

  })

  

  
