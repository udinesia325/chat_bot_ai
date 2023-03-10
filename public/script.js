// buat konfigurasi ke socket
const socket = new io()
socket.on("connect", () => {
    console.log("socket connected")
})

// ambil elemen
const chatContainer = document.querySelector(".chat-container")
const form = document.querySelector("form")

form.addEventListener("submit", (event) => {
    event.preventDefault()
    // ambil input
    const input = form.querySelector("input")
    // emit ke socket
    socket.emit("message", input.value)
    // buat bubble
    generateChatBubble(input.value)
    // bersihkan input
    input.value = ""
    // tampilkan loading
    generateLoader()
    scrollDown()
})

socket.on("response_success", response => {
    if (response.length) {
        generateChatBubble(response[0].text, "bot")
        removeLoader()
        scrollDown()
    }
})

/**
 * @param text string
 * @param type string <user|bot>
 * @returns void
 */
const generateChatBubble = (text = "", type = "user") => {
    const div = document.createElement("div")
    div.classList.add("chat-bubble", type)
    div.innerText = text.replace(/\r?\n|\r/g, "");
    chatContainer.appendChild(div)
}
const generateLoader = () => {
    const div = document.createElement("div")
    div.classList.add("chat-processing")
    div.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
    `
    chatContainer.appendChild(div)
}
const removeLoader = () => {
    const loaders = chatContainer.querySelectorAll(".chat-processing")
    for (const loader of loaders) {
        loader.remove()
    }
}
const scrollDown = () => {
    window.scrollTo(0, document.body.scrollHeight)
}
