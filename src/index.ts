import {
  MailConfigContentTypes,
  UserMailConfigTypes,
  MailOptions,
  EmailDeliveryResponse,
} from "./type";

import * as nodemailer from "nodemailer";
import * as fs from "fs";
import * as handlebars from "handlebars";

function readHTMLFile(
  path: string,
  callback: (err: NodeJS.ErrnoException | null, html?: string) => void
) {
  fs.readFile(
    path,
    { encoding: "utf-8" },
    function (err: NodeJS.ErrnoException | null, html: string) {
      if (err) {
        callback(err);
      } else {
        callback(null, html);
      }
    }
  );
}

export function sendMail(
  to: string,
  htmlFile: MailConfigContentTypes,
  mailRequest: Record<string, string>,
  userMailConfig: UserMailConfigTypes
) {
  // e-mail information
  const username = userMailConfig.username;
  const password = userMailConfig.password;
  const port = userMailConfig.port;
  const host = userMailConfig.host;

  // Path of the email content to be sent
  const fullPath: string = htmlFile.fileExtension;

  readHTMLFile(fullPath, function (err, html) {
    if (err) {
      console.log("error reading file", err);
      return;
    }

    var template = handlebars.compile(html);

    // We replace the {{code or something}} in the html files with the filled one.
    const replacements: Record<string, string> = {};

    for (const key in mailRequest) {
      replacements[key] = mailRequest[key];
    }

    const htmlToSend: string = template(replacements);
    // Transporter
    const transporter: nodemailer.Transporter = nodemailer.createTransport({
      host: host,
      port: port,
      secure: false, // false ise TLS kullanılacak
      auth: {
        user: username,
        pass: password,
      },
    });

    const mailOptions: MailOptions = {
      from: username,
      to: to,
      subject: htmlFile.title,
      html: htmlToSend,
    };

    // Email sending process
    transporter.sendMail(
      mailOptions,
      (error: Error | null, info: EmailDeliveryResponse) => {
        if (error) {
          return console.error("Send Mail Error:", error);
        }
        console.log("Mail sended:", info.messageId);
      }
    );
  });
}
