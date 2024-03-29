const nodemailer = require('nodemailer');
require("dotenv").config();
const NODEMAILER_USER = process.env.NODEMAILER_USER;
const NODEMAILER_PASS = process.env.NODEMAILER_PASS;

let transporter = nodemailer.createTransport({
    
    host: 'smtp-mail.outlook.com',
    port: 587,
    secureConnection: false,
    // auth: auth,
    tls: {ciphers: 'SSLv3'},
    // host: "smtp.gmail.com",
    // port: 465,
    // secure: true,
    auth: {user:NODEMAILER_USER, pass:NODEMAILER_PASS}, 
});

module.exports = transporter;