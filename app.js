const http = require("http")
const express = require("express")
const { Server } = require("socket.io")
const path = require("path")
const socketHandler = require("./handler/socketHandler")


require("dotenv").config()


const PORT = process.env.PORT || 8080
const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static(path.join(__dirname, "public")))
io.on('connection', socketHandler(io));

server.listen(PORT, () => {
    console.log(`Sever berjalan pada port ${PORT}`)
})


