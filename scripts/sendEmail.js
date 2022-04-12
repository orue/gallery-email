const fs = require("fs");
const env = require("dotenv").config();
const nodemailer = require("nodemailer");

async function sendEmail(htmlPath) {
    try {
        const mailConfig = {
            user: env.parsed.EMAIL_USER,
            password: env.parsed.EMAIL_PASSWORD,
            supportEmailFrom: env.parsed.SUPPORT_EMAIL_FROM,
            supportEmailTo: env.parsed.SUPPORT_EMAIL_TO,
        }
        
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

sendEmail("../index.html")
