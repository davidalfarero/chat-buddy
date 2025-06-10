import nodemailer from 'nodemailer';
import { sendResetPasswordEmailTemplate, sendResetSuccessTemplate, sendVerificationEmailTemplate, sendWelcomeEmailTemplate } from './emailTemplate.js';

export const sendVerificationEmail = async (email, name, verificationToken) => {

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const html = sendVerificationEmailTemplate(verificationToken, name);

  await transporter.sendMail({
    from: '"Chat Buddy" <david.alfarero@gmail.com>',
    to: email,
    subject: "Verify Your Email",
    html
  });
};

export const sendVerifiedEmail = async (email, name) => {

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const html = sendWelcomeEmailTemplate(name);

  try {
    await transporter.sendMail({
      from: '"Chat Buddy" <david.alfarero@gmail.com>',
      to: email,
      subject: "Email Has Been Verified",
      html
    });
  } catch (error) {
    console.error("Failed to send email: ", error);
  }
};

export const sendResetPasswordEmail = async (email, name, resetURL) => {

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const html = sendResetPasswordEmailTemplate(name, resetURL);

  try {
    await transporter.sendMail({
      from: '"Chat Buddy" <david.alfarero@gmail.com>',
      to: email,
      subject: "Reset Your Password",
      html
    });
  } catch (error) {
    console.error("Failed to send email: ", error);
  }
};

export const sendResetSuccessEmail = async (email, name) => {

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const html = sendResetSuccessTemplate(name);

  try {
    await transporter.sendMail({
      from: '"Chat Buddy" <david.alfarero@gmail.com>',
      to: email,
      subject: "Your password has been changed",
      html
    });
  } catch (error) {
    console.error("Failed to send email: ", error);
  }
};

