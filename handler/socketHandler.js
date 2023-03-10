const completionHandler = require("./completionHandler")

let countUser = 0
const socketHandler = (io) => {
    return (socket) => {
        countUser++
        io.emit("countUser", countUser)
        socket.on("message", async (message) => {
            try {
                const response = await completionHandler(message)
                socket.emit("response_success", response.choices)
            } catch (error) {
                console.log(error)
                socket.emit("response_error", "Terjadi kesalahan")
            }

        })
        socket.on('disconnect', () => {
            countUser--
        })
    }
}

module.exports = socketHandler
