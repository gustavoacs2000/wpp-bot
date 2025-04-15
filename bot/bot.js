// import fs from "fs";
// import { Selenium } from "./venom_bot.js";

// class CreateWppBot {
//   constructor() {
//     this.selenium = new Selenium();
//   }

//   async createBot() {
//     try {
//       await this.selenium.get_url("https://web.whatsapp.com/");
//       await this.selenium.wait_ready_state();

//       let qr_code_base64 = await this.selenium.build_screenshot_buffer64(
//         "css",
//         'canvas[aria-label="Scan this QR code to link a device!"]'
//       );

//       fs.writeFileSync("qrcode.png", qr_code_base64, "base64");
//       console.log(teste);
//       // montar arquivo com base64
//       await element.click();
//     } catch (error) {
//       console.error(error);
//       console.error(error);
//     }
//   }
// }

// export { CreateWppBot };
