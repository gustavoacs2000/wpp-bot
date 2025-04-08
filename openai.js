const { OpenAIApi, Configuration } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // load this from env
});

const openai = new OpenAIApi(configuration);

async function askChatGPT(prompt) {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are an assistant that creates WhatsApp bot menus.",
      },
      {
        role: "system",
        content:
          "You are an assistant that creates numbered WhatsApp menu options. Output should be in this format:\n1. Option A\n2. Option B\n...",
      },
    ],
  });

  return response.data.choices[0].message.content;
}

module.exports = { askChatGPT };
