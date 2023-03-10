const openai = require("../openai")

const completionHandler = async (message) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
        temperature: 0,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    })
    return response.data

}
module.exports = completionHandler
