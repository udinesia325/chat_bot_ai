const http = require("http")
const express = require("express")
const { Server } = require("socket.io")
const path = require("path")


require("dotenv").config()


const PORT = process.env.PORT || 8080
const app = express()
const server = http.createServer(app)
const io = new Server(server)
let countUser = 0
app.use(express.static(path.join(__dirname, "public")))
io.on('connection', (socket) => {
    countUser++
    io.emit("countUser", countUser)
    socket.on('disconnect', () => {
        countUser--
    });
});

server.listen(PORT, () => {
    console.log(`Sever berjalan pada port ${PORT}`)
})

