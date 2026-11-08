// รายละเอียดโปรเจกต์ lineMeetingBot แก้ไขที่ไฟล์นี้
export const lineMeetingBot = {
  id: "meeting-summary",
  number: "04",
  title: "Voice to Clarity",
  type: "LINE MEETING BOT",
  category: "ai",
  visual: "meeting",
  subtitle: {
    th: "บอท LINE ถอดเสียงและสรุปการประชุมภาษาไทย",
    en: "A LINE bot for meeting audio transcription and summaries.",
  },
  detail: {
    th: "Webhook ของ LINE รับไฟล์เสียงจากแชต (เช่น m4a/mp3) จากนั้นฝั่ง Node.js + Express ใช้ Google Gemini 2.5 Flash ถอดเสียงเป็นข้อความและสรุปออกมาเป็นหัวข้อสั้น ๆ ก่อนตอบกลับใน LINE โดยอัตโนมัติ Repository นี้เป็น Fork จาก monmon1123",
    en: "A LINE webhook receives audio files from chat. A Node.js/Express server sends the audio to Google Gemini 2.5 Flash for transcription, then summarizes the result into clear Thai bullet points and replies in LINE. This repository is a fork of monmon1123’s project.",
  },
  features: {
    th: [
      "LINE Messaging API และ webhook พร้อมตรวจสอบ Signature",
      "รับไฟล์เสียง m4a/mp3 แล้วถอดข้อความ",
      "สรุปการประชุมเป็น Bullet Points ด้วย Gemini",
      "ส่งสรุปกลับไปยังแชต LINE",
      "ลบไฟล์เสียงชั่วคราวหลังประมวลผล",
    ],
    en: [
      "LINE Messaging API webhook and signature validation",
      "Audio upload and speech-to-text",
      "Gemini-generated Thai bullet-point summaries",
      "Automatic reply to LINE",
      "Temporary audio cleanup after processing",
    ],
  },
  stack: [
    "Node.js",
    "Express",
    "LINE Bot SDK",
    "Gemini 2.5 Flash",
    "JavaScript",
  ],
  forked: true,
  upstream: "https://github.com/monmon1123/line-meeting-summarizer",
  links: [
    {
      label: "GITHUB FORK",
      url: "https://github.com/bosspa01/line-meeting-summarizer",
      kind: "code",
    },
  ],
  evidence: "GitHub README and server.js",
};
