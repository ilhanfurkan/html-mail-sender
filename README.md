# Email Sending Package

This Node.js package facilitates sending emails using nodemailer. It is designed to send emails with dynamic content using HTML templates. Follow the instructions below to integrate this package into your project.

## Installation

```
npm install html-mail-sender
```

## Usage

### Import the Package

```js
import { sendMail } from "html-mail-sender";
import { MailConfigTypes, UserMailConfigTypes } from "html-mail-sender/type";
```

### Define Email Requests

Create an object with different email types, specifying the file extension of the HTML template and the email title.

```js
const MailTypes: MailConfigTypes = {
  ApplicationReceived: {
    fileExtension: "./template/mail/application-received.html",
    title: "Thank You For Visit Us.",
  },
  EMailVerification: {
    fileExtension: "./template/mail/email-verification.html",
    title: "E Mail Verification",
  },
  LoginSuccessful: {
    fileExtension: "./template/mail/login-successful.html",
    title: "Login Successful",
  },
  // ... other mail types...
};
```

### Prepare Email Content

Create an object with the dynamic content to be replaced in the HTML template.

```js
const mailRequest: Record<string, string> = {
  code: "923161",
  location: "",
  ipAddress: "",
  antiPhishingCode: "316261",
  ....: ".....", // other mail dynamic content '{{aaa}} => aaa: "What do you want to write in the content?'
};
```
### Send Email

Use the sendMail function to send emails.

```js
const htmlMailSender = new HtmlMailSender({
  password: "YOUR_EMAIL_PASSWORD",
  username: "YOUR_EMAIL_USERNAME",
  host: "smtp.gmail.com",
  port: "YOUR_EMAIL_PORT",
  name: "YOUR_EMAIL_NAME",
  secure:"YOUR_EMAIL_SECURE",, // true for 465, false for other ports
});

htmlMailSender.sendMail(
  "TO_EMAIL",
  MailTypes.ApplicationReceived,
  mailRequest
);
```

## HTML Templates

Ensure your HTML templates have placeholders enclosed in double curly braces ({{}}). These placeholders will be replaced with the dynamic content you provide.

## Example HTML Template

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{title}}</title>
</head>
<body>
  <h1>Hello, {{name}}!</h1>
  <p>Your verification code is: {{verificationCode}}</p>
</body>
</html>
```

Notes
Make sure to replace placeholders in your HTML templates with keys used in the mailRequest object.
Adjust the email configuration (userDetailConfig) based on your email provider's settings.
