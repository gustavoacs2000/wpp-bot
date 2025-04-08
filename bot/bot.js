const venom = require("venom-bot");

let clientInstance;

function parseMenu(menuText) {
  const options = [];
  const lines = menuText.split("\n");

  for (const line of lines) {
    const match = line.match(/^(\d+)[\)\.\-]?\s*(.*)/);
    if (match) {
      options.push({ key: match[1], text: match[2] });
    }
  }

  return options;
}

async function startVenomBot(menuText) {
  if (clientInstance) return; // Already running

  const menuOptions = parseMenu(menuText);

  venom
    .create({
      session: "whatsapp-bot",
      multidevice: true,
    })
    .then((client) => {
      clientInstance = client;

      console.log("\n🤖 WhatsApp Bot is ready!");

      client.onMessage((message) => {
        if (message.isGroupMsg === false) {
          const selectedOption = menuOptions.find(
            (opt) => opt.key === message.body.trim()
          );

          if (selectedOption) {
            client.sendText(
              message.from,
              `✅ You selected: ${selectedOption.text}`
            );
          } else {
            let response = "*Please select an option:*\n";
            menuOptions.forEach((opt) => {
              response += `${opt.key}. ${opt.text}\n`;
            });
            client.sendText(message.from, response);
          }
        }
      });
    })
    .catch((error) => {
      console.error("❌ Error creating session:", error);
      throw error;
    });
}

module.exports = { startVenomBot };
