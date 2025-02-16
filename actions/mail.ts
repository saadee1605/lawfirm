"use server";
import nodemailer from "nodemailer";

export async function emailSend(param) {

    const { to, subject, text } = param;   
    
  // Create reusable transporter object using SMTP transport
   const transporter = nodemailer.createTransport({
     service: "gmail", // You can use other services like Outlook, SMTP, etc.
     auth: {
       user: process.env.EMAIL_USER, // Your email
       pass: process.env.EMAIL_PASS, // Your email password or app password
     },
   });

   try {
     await transporter.sendMail({
       from: process.env.EMAIL_USER, // Sender email
       to, // Recipient email
       subject, // Email subject
       text, // Email body
     });
     return true;
   } catch (error) {
     console.error("Error sending email:", error);
     throw new Error("Failed to send email");
   }
}
