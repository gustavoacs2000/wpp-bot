import { create, Whatsapp } from "venom-bot";
import fs from "fs";
import { enviar_email } from "../models/email.js";

class BotInstance {
  constructor(session_name) {
    this.session_name = session_name || "sessionName";
    this.qrCodePath = `./qr_code/${this.session_name}_qrcode.png`;
    this.userStates = {}; // Guarda o estado do atendimento por número
  }

  create() {
    const sessionName = this.session_name;
    const qrCodePath = this.qrCodePath;

    return create(
      sessionName,
      (base64Qr, asciiQR, attempts, urlCode) => {
        console.log(asciiQR);

        const matches = base64Qr.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
          console.error("❌ QR inválido");
          return;
        }

        const buffer = Buffer.from(matches[2], "base64");

        fs.writeFile(qrCodePath, buffer, "binary", (err) => {
          if (err) {
            console.error("Erro ao salvar o QR Code:", err);
          } else {
            console.log(`✅ QR Code salvo em ${qrCodePath}`);
          }
        });

        enviar_email(
          "gustavoacs2000@gmail.com",
          "QR Code",
          "QR Code to initialize your Whatsapp bot",
          qrCodePath
        );
      },
      undefined,
      {
        headless: true,
        browserArgs: [
          "--headless=new",
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-gpu",
          "--disable-infobars",
          "--window-size=1920,1080",
        ],
        logQR: false,
        executablePath:
          "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      }
    );
  }

  start_client(client, menuJson) {
    this.start_atendimento(client, menuJson);
  }

  start_atendimento(client, menuJson) {
    const userStates = this.userStates;

    const sendMenu = async (to, options) => {
      const menuText = options.map((opt) => opt.option).join("\n");
      await client.sendText(`${to}@c.us`, `Escolha uma opção:\n${menuText}`);
    };

    const findOption = (options, choice) => {
      return options.find((opt) => opt.option.startsWith(choice));
    };

    client.onMessage(async (message) => {
      if (message.isGroupMsg) return;
      const number = message.from.replace(/@c.us/g, "");
      const userInput = message.body.trim();

      if (!userStates[number] || userStates[number].finished) {
        userStates[number] = {
          history: [],
          currentOptions: menuJson,
          finished: false,
        };
        await sendMenu(number, menuJson);
        return;
      }

      const state = userStates[number];
      const selected = findOption(state.currentOptions, userInput);

      if (selected) {
        state.history.push(selected.option);

        if (
          selected.option.toLowerCase().includes("finalizar") ||
          selected.option.toLowerCase().includes("sair")
        ) {
          await client.sendText(
            `${number}@c.us`,
            "✅ Atendimento finalizado. Para iniciar novamente, envie qualquer mensagem."
          );
          userStates[number].finished = true;
          return;
        }

        if (selected.nested && selected.nested.length > 0) {
          state.currentOptions = selected.nested;
          await sendMenu(number, selected.nested);
        } else {
          await client.sendText(
            `${number}@c.us`,
            `Você selecionou: ${selected.option}\nO que deseja fazer agora?`
          );
          await sendMenu(number, menuJson);
          userStates[number] = {
            history: [],
            currentOptions: menuJson,
            finished: false,
          };
        }
      } else {
        await client.sendText(
          `${number}@c.us`,
          "❌ Opção inválida. Por favor, escolha uma opção válida:"
        );
        await sendMenu(number, state.currentOptions);
      }
    });
  }
}

export { BotInstance };
