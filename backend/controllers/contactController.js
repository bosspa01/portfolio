import { createMailer } from "../config/mailer.js";
import { validateContact, escapeHtml } from "../utils/validateContact.js";

export const sendContact = async (req, res) => {
  const data = req.body || {};

  if (!validateContact(data)) {
    return res
      .status(400)
      .json({ ok: false, message: "กรุณากรอกข้อมูลให้ถูกต้อง" });
  }

  const mailer = createMailer();
  if (!mailer) {
    return res.status(503).json({
      ok: false,
      code: "MAIL_NOT_CONFIGURED",
      message: "ยังไม่ได้ตั้งค่าอีเมล กรุณาใช้ปุ่มส่งอีเมลโดยตรง",
    });
  }

  const name = data.name.trim();
  const email = data.email.trim();
  const message = data.message.trim();

  try {
    await mailer.sendMail({
      from: `Portfolio Contact <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: { name, address: email },
      subject: `[Portfolio] ข้อความจาก ${name.replace(/[\r\n]/g, "")}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<h2>Portfolio contact</h2><p>From: ${escapeHtml(name)}</p><p>Email: ${escapeHtml(email)}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    });
    return res.json({ ok: true, message: "ส่งข้อความสำเร็จ" });
  } catch (error) {
    console.error("Email failed:", error.message);
    return res
      .status(502)
      .json({
        ok: false,
        message: "ส่งข้อความไม่สำเร็จ กรุณาติดต่อผ่านอีเมลโดยตรง",
      });
  }
};
