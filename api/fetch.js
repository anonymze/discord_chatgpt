
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const openAi = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
);

const fetchedData = async (prompt) => {
    const completion = await openAi.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
    });

    return completion.data.choices[0].message?.content;
};

module.exports = fetchedData;
