const nodemailer = require('nodemailer')
const asyncHandler = require('express-async-handler')
const dotenv = require('dotenv').config()

const sendEmail = asyncHandler(async (data, req, res) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
            // user: "maddison53@ethereal.email",
            // pass: "jn7jnAPss4f63QBp6D",
            user: 'truonghai9426@gmail.com',
            pass: 'trieubd@93710'
        },
    });

    const info = await transporter.sendMail({
        from: 'truonghai9426@gmail.com', 
        to: data.to, 
        subject: data.subject, 
        text:data.text, 
        html: data.html, 
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
})
module.exports = { sendEmail }