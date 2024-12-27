import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js";
export const sendMessage = async (req,res)=>{
try {
    const{message} = req.body;
    const {id: receiverId}= req.params;
    const senderId = req.user._id;
  let conversation = await Conversation.findOne({
    participants:{$all:[senderId,receiverId]},

  })
  if(!conversation){
    conversation = await Conversation.create({
        participants:[senderId,receiverId],
        // messages:[message] does not need to define specifically because already set to default null in tghe model
    })
  }
  const newMessage = await Message.create({
    senderId:senderId,
    receiverId:receiverId,
    message:message
  })
  if(newMessage){
    conversation.messages.push(newMessage._id);
  }
  // await conversation.save();
  await Promise.all([conversation.save(),newMessage.save()])// this line of code will save both to database prallel 
  res.status(201).json(newMessage);
  console.log("message sent");

} catch (error) {
    console.log("error in message controller");
    res.status(500).json({error:"internal server error"})
   
}
}

export const getMessages = async (req,res)=>{
    try {
      const {id: UserToChatId}= req.params;
      const senderId = req.user._id;
      const conversation = await Conversation.findOne({
        participants:{$all:[senderId,UserToChatId]},
      }).populate("messages");
      if(!conversation){
       return res.status(200).json([]);
      }
      const messages =conversation.messages;

      return res.status(200).json(messages);
    } catch (error) {
      console.log("error in message controller  getMessages");
      res.status(500).json({error:"internal server error"})
    }
}