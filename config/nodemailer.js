import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create a Transporter
const transporter = nodemailer.createTransport({
  port: process.env.EMAIL_PORT,
  host: process.env.EMAIL_HOST,
  secure: true,
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default transporter;
