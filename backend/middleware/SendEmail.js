const nodemailer = require("nodemailer");

const sendEmail =  (email, subject, text) => {
    
        const transporter = nodemailer.createTransport({
         
            host: process.env.HOST,
            service: process.env.SERVICE,
            
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
            // from: process.env.USER,
        });

        transporter.sendMail({
            from: process.env.USER1,
            to: email,
            subject: subject,
            text: text,
        });
        

};

module.exports = sendEmail;