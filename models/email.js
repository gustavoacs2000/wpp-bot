import nodemailer from "nodemailer";
import { EmailError } from "./errors.js";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

async function enviar_email(to, subject, text, attachments) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      logger: true,
      debug: true,
      auth: {
        user: process.env.DEFAULT_EMAIL, // Accessing from .env
        pass: process.env.DEFAULT_EMAIL_PASSWORD, // Accessing from .env
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const email_attachments = [];
    if (Array.isArray(attachments)) {
      for (let i = 0; i < attachments.length; i++) {
        // Ensure each attachment is an object with filename and path
        email_attachments.push({
          filename: path.basename(attachments[i]), // Extract filename from path
          path: attachments[i], // Full path to the file
        });
      }
    } else if (typeof attachments === "string") {
      // Single attachment as a string
      email_attachments.push({
        filename: path.basename(attachments),
        path: attachments,
      });
    }

    const html_body = `
        <p>${text}</p>
        <p>--<br>
        Invisual Tecnologia<br>
        Process Automation by Invisual<br>
        Contact - +55 61 98193-0992<br>
        Email: contato@invisual.com.br</p>
        <img src="https://drive.google.com/uc?id=1kq73enpKlBCwfEhxJh7f1-z46al3AhLx" alt="Invisual Tecnologia">`;

    let mailOptions = {
      from: process.env.DEFAULT_EMAIL,
      to: to,
      subject: subject,
      html: html_body,
      attachments: email_attachments, // Attachments array
    };

    transporter.sendMail(mailOptions, async function (err, info) {
      if (err) {
        console.log(`Erro: ${err}`);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  } catch (error) {
    throw new EmailError("Erro ao enviar e-mail:\n" + error.message);
  }
}

export { enviar_email };

/**
async enviarEmailHTML(descricaoHTML) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      logger: true,
      debug: true,
      auth: {
        user: "automacao@invisual.com.br",
        pass: "@utomac@o",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let mailOptions = {
      from: "automacao@invisual.com.br",
      to: this.destinatario,
      subject: this.assunto,
      text: "",
      html: descricaoHTML,
    };

    transporter.sendMail(mailOptions, async function (err, info) {
      if (err) {
        console.log(`Erro: ${err}`);
        throw new EmailError(err);
      } else {
        console.log(`Email sent ${info.response}`);
      }
    });
  }

  async enviarEmailComAnexo(descricaoTXT, pathAnexos, attachments) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      logger: true,
      debug: true,
      auth: {
        user: "automacao@invisual.com.br",
        pass: "@utomac@o",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const attachments = [];
    if (typeof attachments == "object") {
      for (let i = 0; i < attachments.length; i++) {
        attachments.push({
          filename: attachments[i],

          path: path.join(
            pathAnexos,
            (
              path.parse(attachments[i]).name + path.parse(attachments[i]).ext
            ).trim()
          ),
        });
      }
    } else {
      attachments.push({
        filename: attachments,
        path: path.join(
          pathAnexos,
          (path.parse(attachments).name + path.parse(attachments).ext).trim()
        ),
      });
    }

    let mailOptions = {
      from: "automacao@invisual.com.br",
      to: this.destinatario,
      subject: this.assunto,
      text: descricaoTXT,
      //html : this.jsonMessage,
      attachments,
    };
    transporter.sendMail(mailOptions, async function (err, info) {
      if (err) {
        console.log(`Erro: ${err}`);
      } else {
        console.log(`Email sent ${info.response}`);
      }
    });
  } 
  
 
 */
