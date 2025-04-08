const express = require("express");
const router = express.Router();
const { askChatGPT } = require("../openai");
const { startVenomBot } = require("../bot/bot");

let latestMenu = "";

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/generate-menu", async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const chatResponse = await askChatGPT(prompt);
    latestMenu = chatResponse; // Store for bot use
    res.json({ menu: chatResponse });
  } catch (err) {
    res.status(500).json({ error: "Failed to get response from ChatGPT" });
  }
});

router.post("/start-bot", async (req, res) => {
  try {
    await startVenomBot(latestMenu);
    res.json({ status: "success" });
  } catch (err) {
    console.error("Failed to start bot:", err);
    res.status(500).json({ error: "Failed to start bot" });
  }
});

module.exports = router;
