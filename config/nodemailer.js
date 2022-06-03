const nodemailer = require('nodemailer');
const { auth } = require("./keys");

let transporter = nodemailer.createTransport({
    // host: 'smtp-mail.outlook.com',
    // port: 587,
    // secureConnection: false,
    // auth: auth,
    // tls: {
    //     ciphers: 'SSLv3'
    // },
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: auth
});

module.exports = transporter;