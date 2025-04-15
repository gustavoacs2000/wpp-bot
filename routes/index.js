import { Router } from "express";
import { askChatGPT } from "../api/openai.js";
// import { CreateWppBot } from "../bot/bot.js";
import { BotInstance } from "../bot/venom_bot.js";
const router = Router();
let latestMenu = "";

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/generate-menu", async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const chatResponse = await askChatGPT(prompt);
    latestMenu = chatResponse;
    res.json({ menu: chatResponse });
  } catch (err) {
    res.status(500).json({ error: "Failed to get response from ChatGPT" });
  }
});

router.post("/start-bot", async (req, res) => {
  try {
    const bot = new BotInstance();
    const client = await bot.create();
    bot.start_client(client, req.body.menu);
    res.json({ status: "success" });
  } catch (err) {
    console.error("Failed to start bot:", err);
    res.status(500).json({ error: "Failed to start bot" });
  }
});

router.post("/check-flow", async (req, res) => {
  const { email, menu } = req.body;
  try {
    const prompt = `Este é o fluxo de menu de um bot de WhatsApp: ${JSON.stringify(
      menu,
      null,
      2
    )}. Verifique se há problemas de consistência, ambiguidades ou melhorias e retorne em texto claro e objetivo.`;
    const analysis = await askChatGPT(prompt);
    res.json({ analysis });
  } catch (err) {
    console.error("Failed to check flow:", err);
    res.status(500).json({ error: "Failed to analyze flow" });
  }
});

export default router;
