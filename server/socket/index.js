const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const User = require("../models/User.model")
const {Conversation, Message} = require("../models/Conversation.model")

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
  },
});

const onlineUser = new Set();

io.on('connection', async(socket) => {
  console.log("connected user", socket.id);

  const token= socket.handshake.auth.token;

  const user = await getUserDetailsFromToken(token);

  socket.join(user?._id?.toString());
  onlineUser.add(user?._id?.toString());

  io.emit('onlineUser', Array.from(onlineUser));

  socket.on('message-page', async (userId) =>{
    console.log('userId', userId);
    const userDetails = await User.findById(userId).select('-password');
    
    const payload = {
      _id: userDetails._id,
      name: userDetails.name,
      email: userDetails.email,
      profile_Pic: userDetails.profile_Pic,
      online: onlineUser.has(userId),
    }

    socket.emit('message-user', payload);

    const getConversation = await Conversation.findOne({"$or" : [
      {sender : user?._id, receiver: userId},
      {sender : userId, receiver: user?._id},
    ]}).populate('messages').sort({updatedAt: -1})

    socket.emit('message', getConversation.messages);
  })

  socket.on('new-message' , async(data) =>{

    let conversation = await Conversation.findOne({
      "$or": [
    {sender: data?.sender, receiver: data?.receiver},
    {sender: data?.receiver, receiver: data?.sender},
  ]
    })
    console.log('conversation', conversation);
    if(!conversation){
      const createConversation = await Conversation({
        sender: data?.sender,
        receiver: data?.receiver,
      })
      conversation = await createConversation.save();
    }

    const message = new Message({
      text: data?.text,
      imageUrl: data?.imageUrl,
      videoUrl: data?.videoUrl,
      msgByUserId : data?.msgByUserId,
    })

    const saveMessage = await message.save();

    const updateConversation = await Conversation.updateOne({_id: conversation?._id},{
      "$push": {messages : saveMessage?._id}
    })

    const getConversation = await Conversation.findOne({"$or": [
    {sender: data?.sender, receiver: data?.receiver},
    {sender:data?.receiver, receiver: data?.sender},
  ]}).populate('messages').sort({updatedAt: -1})

    io.to(data?.sender).emit('message', getConversation.messages
    );
    io.to(data?.receiver).emit('message', getConversation.messages
    );
   
  } )

  socket.on('sidebar', async(currentId) =>{
    console.log('currentId', currentId);

    const currentUserConversation = await Conversation.find({
      "$or":[
        {sender: currentId},
        {receiver: currentId},
      ]
    }).sort({updatedAt: -1}).populate('messages').populate('sender').populate('receiver')
    
    const conversation = currentUserConversation.map((con) =>{
      const countUnseenMsg = con.messages.reduce((prev,curr) => prev + (curr.seen ? 0 :1),0)
      return {
        _id: con._id,
        sender: con.sender,
        receiver: con.receiver,
       unseenMsg : countUnseenMsg,
       lastMsg: con.messages[con?.messages?.length -1]
      }
    })
    console.log('conversation', conversation);
    socket.emit('conversation', conversation);

  })

  socket.on('disconnect', () => {
    onlineUser.delete(user?._id);
    console.log('disconnect user', socket.id);

  });
});

module.exports = {
  app,
  server
};
