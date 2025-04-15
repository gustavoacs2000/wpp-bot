import "dotenv/config";
import OpenAI from "openai";

console.log("🤖 OpenAI API Key:", process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function askChatGPT(prompt) {
  const chatResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are an assistant that creates WhatsApp menus. Use numbered format with how many numbers you think is necessary: \n1. Option A\n2. Option B\n3. Option C\n",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return chatResponse.choices[0].message.content;
}

export default { askChatGPT };
