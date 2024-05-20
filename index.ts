import handlebars from "handlebars";
import {
  EmailDeliveryResponse,
  MailConfigContentTypes,
  MailConfiguration,
  MailOptions,
} from "./type";
import * as fs from "fs";
import * as nodemailer from "nodemailer";

export class HtmlMailSender {
  mailConfiguration: MailConfiguration;

  constructor(mailConfiguration: MailConfiguration) {
    this.mailConfiguration = mailConfiguration;
  }

  async sendMail(
    to: string,
    htmlFile: MailConfigContentTypes,
    mailRequest: Record<string, string>
  ): Promise<void> {
    let html = "";
    try {
      html = fs.readFileSync(htmlFile.fileExtension, {
        encoding: "utf-8",
      });
    } catch (error) {
      throw new Error("Error reading file");
    }

    var template = handlebars.compile(html);

    const replacements: Record<string, string> = {};

    for (const key in mailRequest) {
      replacements[key] = mailRequest[key];
    }

    const htmlToSend: string = template(replacements);

    const transporter: nodemailer.Transporter = nodemailer.createTransport({
      host: this.mailConfiguration.host,
      port: this.mailConfiguration.port,
      secure: this.mailConfiguration.secure,
      auth: {
        user: this.mailConfiguration.username,
        pass: this.mailConfiguration.password,
      },
    });

    const mailOptions: MailOptions = {
      from: ` ${this.mailConfiguration.name} <${this.mailConfiguration.username}>`,
      to: to,
      subject: htmlFile.title,
      html: htmlToSend,
    };

    transporter.sendMail(
      mailOptions,
      (error: Error | null, info: EmailDeliveryResponse) => {
        if (error) {
          throw new Error("Error sending mail");
        }
        console.log("Mail sended:", info.messageId);
      }
    );
  }
}
