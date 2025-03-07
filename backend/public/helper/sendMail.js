import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true, 
    auth: {
      user: "foodies.0905@gmail.com",
      pass: process.env.SENDMAIL_PASSWORD,
    },
  });

const sendMail = async (to,subject,html) => {
    const info = await transporter.sendMail({
        from: "foodies.0905@gmail.com", 
        to, 
        subject,
        html, 
      });
}

export {sendMail};