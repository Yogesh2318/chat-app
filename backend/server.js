 
 import express from"express"
 import dotenv from"dotenv";
 import authRoutes from"./routes/auth.routes.js";
 import messageRoutes from"./routes/message.routes.js";
 import usersRoutes from"./routes/user.routes.js"
import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser"; // use get the cookie from the request body 
 import { app, server } from "./socket/socket.js";
import cors from "cors";

app.use(cors());


 dotenv.config();
 const port = process.env.PORT||5000
 app.use(express.json()); // helps convert the data coming by request in the post/ get method 
 app.use(cookieParser());

 app.use("/api/users",usersRoutes)
 app.use("/api/auth",authRoutes);
 app.use("/api/messages",messageRoutes);

server.listen(port,()=>{
   connectToMongoDB();
   
    console.log(`server running on port ${port}`);
 })
