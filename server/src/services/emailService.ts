import nodemailer from 'nodemailer';
import { env } from '../config/env';
import { logger } from '../config/logger';
import type { ContactInput } from '../schemas/contact';

export async function sendContactEmail(data: ContactInput): Promise<{ delivered: boolean; mode: string }> {
  // If SMTP is not configured, simulate delivery safely in dev
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
    logger.info('SMTP credentials not configured. Simulating email delivery:');
    logger.info(`[SIMULATED EMAIL] To: ${env.RECIPIENT_EMAIL}`);
    logger.info(`[SIMULATED EMAIL] From: ${data.name} <${data.email}>`);
    logger.info(`[SIMULATED EMAIL] Subject: ${data.subject}`);
    logger.info(`[SIMULATED EMAIL] Message: ${data.message.substring(0, 100)}...`);
    return { delivered: true, mode: 'simulated_local' };
  }

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });

  // 1. Notification to Devang
  const notificationMail = {
    from: `"${data.name} via Portfolio" <${env.EMAIL_FROM}>`,
    to: env.RECIPIENT_EMAIL,
    replyTo: data.email,
    subject: `[Portfolio Inquiry] ${data.subject}`,
    text: `New contact submission from Devang's Portfolio Website:\n\nName: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage:\n${data.message}\n\nTimestamp: ${new Date().toISOString()}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #0f172a; margin-top: 0;">New Portfolio Contact Message</h2>
        <p><strong>From:</strong> ${data.name} (&lt;<a href="mailto:${data.email}">${data.email}</a>&gt;)</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${data.message}</div>
        <p style="font-size: 12px; color: #64748b; margin-top: 25px;">Delivered by Devang Chaudhari's Portfolio API.</p>
      </div>
    `,
  };

  // 2. Confirmation auto-reply to the sender
  const confirmationMail = {
    from: `"Devang Chaudhari" <${env.EMAIL_FROM}>`,
    to: data.email,
    subject: `Thank you for reaching out — Devang Chaudhari`,
    text: `Hi ${data.name},\n\nThank you for reaching out through my portfolio website. I have received your message regarding "${data.subject}" and will review it promptly.\n\nI typically respond within 24 hours.\n\nBest regards,\nDevang Chaudhari\nSoftware Engineer | Pune, India\nhttps://devangchaudhari.dev`,
  };

  try {
    await transporter.sendMail(notificationMail);
    // Send confirmation in background
    transporter.sendMail(confirmationMail).catch(err => {
      logger.warn(`Failed to send confirmation email to ${data.email}: ${err.message}`);
    });
    return { delivered: true, mode: 'smtp_live' };
  } catch (error: any) {
    logger.error(`Error sending email via SMTP: ${error.message}`);
    throw error;
  }
}
