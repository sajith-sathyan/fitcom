import IMailerService from "../../domain/service/IMailerService.js";
import nodemailer from "nodemailer";
import env from "../config/environment.js"; // ✅ Import environment variables

// ✅ Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: env.EMAIL_USER, 
    pass: env.EMAIL_PASS,
  },
});

export default class ResendMailerService extends IMailerService {
  async sendMail({ to, subject, html }) {
    try {
      const mailOptions = {
        from: `"Acme Support" <${env.EMAIL_USER}>`, // ✅ Use your email
        to: to,
        subject: subject,
        html: html,
      };

      // ✅ Send Email
      await transporter.sendMail(mailOptions);

      return true;
    } catch (err) {
      console.error("❌ Error sending email:", err.message);
      throw new Error("Failed to send email. Please try again later.");
    }
  }
}
