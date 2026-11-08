// รายละเอียดโปรเจกต์ animeDiscordBot แก้ไขที่ไฟล์นี้
export const animeDiscordBot = {
  id: "anime-bot",
  number: "03",
  title: "Anime Discord Bot",
  type: "DISCORD ANIME BOT",
  category: "bot",
  visual: "anime",
  subtitle: {
    th: "บอท Discord แนะนำอนิเมะด้วยภาษาธรรมชาติ",
    en: "A Discord anime recommender that understands natural language.",
  },
  detail: {
    th: "บอท Discord รับคำค้นจากภาษาไทยหรืออังกฤษ เช่น “ต่างโลก” หรือ “แฟนตาซีจบไว คะแนนสูง” ดึงข้อมูลจาก MyAnimeList API v2 แล้วแสดงคำแนะนำพร้อมรูปโปสเตอร์ คะแนน จำนวนตอน และประเภท รองรับทั้งคำสั่ง !anime และการพิมพ์ข้อความปกติ Repository นี้เป็น Fork จาก monmon1123",
    en: "A Discord bot that understands Thai or English anime requests, queries MyAnimeList API v2, and returns recommendation embeds with posters, scores, episode counts and genres. Supports !anime commands and natural conversation. This repository is a fork of monmon1123’s project.",
  },
  features: {
    th: [
      "แนะนำอนิเมะด้วยคำสั่ง !anime และข้อความภาษาไทย",
      "Embed โปสเตอร์ คะแนน จำนวนตอน สถานะ และประเภท",
      "สุ่มคำแนะนำและกรองตามความต้องการ",
      "Retry อัตโนมัติเมื่อ API Rate Limit หรือ Error",
      "กำหนด Discord Channel ที่บอทตอบได้",
    ],
    en: [
      "!anime commands and Thai-language messages",
      "Embeds for posters, scores, episodes and genres",
      "Random recommendations and preference filtering",
      "Automatic retries on API rate limits and errors",
      "Configurable allowed Discord channels",
    ],
  },
  stack: ["Python", "discord.py", "FastAPI", "MyAnimeList API", "httpx"],
  forked: true,
  upstream: "https://github.com/monmon1123/ai-anime-discord-bot",
  links: [
    {
      label: "GITHUB FORK",
      url: "https://github.com/bosspa01/ai-anime-discord-bot",
      kind: "code",
    },
  ],
  evidence: "Fork provenance and repository README",
};
