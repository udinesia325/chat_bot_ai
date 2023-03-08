
const socket = new io()
socket.on("connect", () => {
    console.log("conected")
})
socket.on("countUser", data => {
    console.log(data)
})
