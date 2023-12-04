"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
var nodemailer = __importStar(require("nodemailer"));
var fs = __importStar(require("fs"));
var handlebars = __importStar(require("handlebars"));
function readHTMLFile(path, callback) {
    fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
}
function sendMail(to, htmlFile, mailRequest, userMailConfig) {
    // e-mail information
    var username = userMailConfig.username;
    var password = userMailConfig.password;
    var port = userMailConfig.port;
    var host = userMailConfig.host;
    // Path of the email content to be sent
    var fullPath = htmlFile.fileExtension;
    readHTMLFile(fullPath, function (err, html) {
        if (err) {
            console.log("error reading file", err);
            return;
        }
        var template = handlebars.compile(html);
        // We replace the {{code or something}} in the html files with the filled one.
        var replacements = {};
        for (var key in mailRequest) {
            replacements[key] = mailRequest[key];
        }
        var htmlToSend = template(replacements);
        // Transporter
        var transporter = nodemailer.createTransport({
            host: host,
            port: port,
            secure: false, // false ise TLS kullanılacak
            auth: {
                user: username,
                pass: password,
            },
        });
        var mailOptions = {
            from: username,
            to: to,
            subject: htmlFile.title,
            html: htmlToSend,
        };
        // Email sending process
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.error("Send Mail Error:", error);
            }
            console.log("Mail sended:", info.messageId);
        });
    });
}
exports.sendMail = sendMail;
