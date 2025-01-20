import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

export const sendMail = async(to, subject, text, html) => {
   await transporter.sendMail({
        to,
        subject,
        text,
        html
   });
}