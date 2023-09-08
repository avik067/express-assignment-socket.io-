const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())


app.get('/', function (req, res) {
  res.send('A small backend application which can generate and emit an encrypted data stream over a socket !! Live 😃')
})

app.listen(3000,()=> {

    console.log("Node is running : 3000") ;
})