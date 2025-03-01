import nodemailer from "nodemailer";
import logger from "../logs/logger.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "",
    pass: "",
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
