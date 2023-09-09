require('dotenv').config()
const express = require('express')
const app = express() 
const cors = require('cors')
const path = require ('path')


const  port  =  process.env.PORT || 4000 ;


const http = require('http').Server(app) ///// 


app.use(cors())

app.use(express.json())

////////////////////////////// http server + -> socket.io

const io = require ('socket.io')(http,{
  cors: {
    origin: "*"
  }
}) ;



///////////////////////////////// listening to app 
// app.listen(port,()=> {  // we wont be listening to the app directly , we will now listen via io inside which we have create socket server 
//   console.log(`Node is running : ${port}`) ;
// })
////////////////////////////////// Home route

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
      
      socket.on("new-message" ,(msg)=> {
        console.log(`from client : ${msg}`)
      })
     
      socket.emit("message",(msg)=>{`Received by the server again ${msg}`})
       
      socket.emit("server","Received by the server")

    })

/////////////////////////



http.listen(port,()=> {
  console.log(`Node is running : ${port}`) ;
})

