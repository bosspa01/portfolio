import nodemailer from 'nodemailer';

export const createMailer = () => {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;

  // ยังไม่ตั้งค่า SMTP -> ไม่แอบบอกว่าส่งสำเร็จ
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) return null;

  const port = Number(process.env.SMTP_PORT || 587);
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === 'true' || port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
};
