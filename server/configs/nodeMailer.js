import nodemailer from "nodemailer";
import logger from "../libs/logger.js";
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (to, subject, data) => {
  try {
    const send = await transporter.sendMail({
      from: `"GC37O" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: data,
    });
    return send?.messageId.length > 0;
  } catch (error) {
    logger.error(`Failed to send EMAIL`);
  }
};

export default sendEmail;
