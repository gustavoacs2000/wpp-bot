# 🤖 WhatsApp AI Bot UI

This repository contains a web-based interface for creating and deploying a WhatsApp bot powered by **ChatGPT** and **Venom Bot**. The bot enables seamless interaction through dynamically generated menus and dialogs.

---

## 📦 Features

- **User-Friendly Interface**: Clean and intuitive web interface for prompt input.
- **AI-Powered**: Leverages OpenAI's ChatGPT API for generating dynamic menus and dialogs.
- **WhatsApp Integration**: Uses [venom-bot](https://github.com/orkestral/venom) for WhatsApp connectivity.
- **Quick Setup**: Start a bot session by scanning a QR Code.
- **In-Memory Storage**: No database required; menus are handled in-memory.

---

## 🚀 How It Works

1. **Access the Web Interface**: Open the application in your browser.
2. **Generate Menus**: Input a prompt to create a custom WhatsApp bot menu.
3. **Preview and Confirm**: Review the generated menu on the interface.
4. **Start the Bot**: Scan the QR Code to initiate a WhatsApp bot session.
5. **Interact**: Use the generated menu to communicate with the bot.

---

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/wpp-bot.git
   cd wpp-bot
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open the application in your browser at `http://localhost:3000`.

---

## 📖 Documentation

- **ChatGPT Integration**: Configure your OpenAI API key in the `.env` file.
- **Venom Bot Setup**: Ensure you have the necessary permissions for WhatsApp Web.
- **Custom Prompts**: Use natural language to generate menus tailored to your needs.

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests to improve the project.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🌟 Acknowledgments

- [OpenAI](https://openai.com) for the ChatGPT API.
- [Venom Bot](https://github.com/orkestral/venom) for WhatsApp integration.
- The open-source community for inspiration and support.
