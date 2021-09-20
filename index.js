const express = require('express')
const app = express()
const server = require('http').createServer(app)
const port = process.env.PORT || 3000
const io = require('socket.io')(server)

// Todo : Add a database
const clients = []
const messages = []

io.on('connection', socket => {
  // console.log('Some client connected')

  socket.on('chat', message => {
    // console.log('From client: ', message)
    io.emit('chat', message)
  })
})

server.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})
