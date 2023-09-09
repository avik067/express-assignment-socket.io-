require('dotenv').config()
const randomName = require("./data.json")
const express = require('express')
const mongoose = require('mongoose')
const app = express() 
const cors = require('cors')
const path = require ('path')
const Chat = require('./models/dataModel')

const  port  =  process.env.PORT || 4000 ;


const http = require('http').Server(app) ///// 



app.use(express.json())
// console.log(randomName)
////////////////////////////// http server + -> socket.io

const io = require ('socket.io')(http,{
  cors: {
    origin: "*"
  }
}) ;
/////////////////////////////////////////////////



///////////////////////////////// listening to app 
// app.listen(port,()=> {  // we wont be listening to the app directly , we will now listen via io inside which we have create socket server 
//   console.log(`Node is running : ${port}`) ;
// })
////////////////////////////////// Home route

mongoose.connect(process.env.SECRET_MONGO_LINK)
.then(()=>{
  
    console.log("data base connected")
}).catch((e) => {
   console.log(e)
})



app.get('/', function (req, res) {
  res.send('A small backend application which can generate and emit an encrypted data stream over a socket !!! Live 😃 ')
})

//////////////////////////////// connection

io.on('connection', socket => {
      //  console.log(socket)
      // console.log(socket.id)
      
      console.log("a user is connected")

      socket.on('disconnect',()=> {
        console.log("user disconnected")
      })
      
      socket.on("new-message" ,async(msg)=> {
      
      console.log(`from client : ${msg}`)
      const a  =  Math.ceil(Math.random()*100)
      const b  =  Math.ceil(Math.random()*100)
      console.log(a,b)
      const newOb = {"name":randomName.names[a],"place":randomName.cities[b],"data":msg}
       const newObString = JSON.stringify(newOb)
      try {
        const ch = await Chat.create(newOb) 
        console.log(ch)
        socket.emit("message-back",JSON.stringify(newOb))
     }catch(err) {
         console.log(err)
         socket.emit("message-back",`Error : ${err}`)
     }
  })
     
      socket.emit("server","Received by the server")
      

    })

////////////////////////////////



http.listen(port,()=> {
  console.log(`Node is running : ${port}`) ;
})

