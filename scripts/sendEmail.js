const fs = require("fs");
const env = require("dotenv").config();
const nodemailer = require("nodemailer");

async function sendEmail(htmlPath) {
  try {
    const mailConfig = {
      user: env.parsed.SMTP_USER,
      password: env.parsed.SMTP_PASSWORD,
      supportEmailFrom: env.parsed.EMAIL_FROM_ADDRESS,
      supportEmailTo: env.parsed.EMAIL_TO_ADDRESS,
    };

    const htmlBody = fs.readFileSync(htmlPath, "utf8");

    const mailTransport = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      auth: {
        user: mailConfig.user,
        pass: mailConfig.password,
      },
    });

    const mailOptions = {
      to: mailConfig.supportEmailTo,
      from: mailConfig.supportEmailFrom,
      subject: "this is a test email",
      html: htmlBody,
    };

    await mailTransport.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
}

sendEmail("../tableWithTemplate.html");
