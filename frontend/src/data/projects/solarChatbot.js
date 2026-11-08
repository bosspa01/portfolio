// รายละเอียดโปรเจกต์ solarChatbot แก้ไขที่ไฟล์นี้
export const solarChatbot = {
  id: "solar-chatbot",
  number: "02",
  title: "Solar AI",
  type: "SOLAR / RAG ASSISTANT",
  category: "ai",
  visual: "solar",
  featured: true,
  subtitle: {
    th: "แชตบอทถามตอบพลังงานแสงอาทิตย์จากเอกสาร PDF",
    en: "A solar-energy assistant grounded in PDF documents.",
  },
  detail: {
    th: "ระบบ RAG อ่านข้อมูลจากเอกสารพลังงานแสงอาทิตย์ แบ่งข้อความเป็นส่วน ๆ สร้าง Embeddings แล้วค้นหาด้วย FAISS ก่อนส่งบริบทให้ LLM รองรับ Groq, Claude หรือ Ollama แบบ Local ตามการตั้งค่า Backend ทำด้วย FastAPI และ Frontend ด้วย React + Vite พร้อมสมัครสมาชิก JWT และบันทึกประวัติแชตใน SQLite",
    en: "A RAG pipeline that reads solar PDFs, chunks the documents, generates embeddings and retrieves context using FAISS. FastAPI can answer through Groq, Claude or a local Ollama model depending on configuration. React/Vite UI supports JWT auth and persistent SQLite chat histories.",
  },
  features: {
    th: [
      "ค้นหาเนื้อหาจาก PDF ด้วย embeddings และ FAISS",
      "เลือก LLM อัตโนมัติ Groq → Claude → Ollama ตามการตั้งค่า",
      "สมัครสมาชิก เข้าสู่ระบบด้วย JWT และแยก Session ต่อผู้ใช้",
      "ประวัติแชตจัดเก็บใน SQLite และมี API สำหรับจัดการ Session",
      "มี Dockerfile และตัวเลือก Deploy บน Railway / Vercel",
    ],
    en: [
      "Document retrieval with embeddings and FAISS",
      "Groq / Claude / local Ollama fallback via configuration",
      "JWT authentication and user-specific sessions",
      "SQLite chat history and session API",
      "Dockerfile and Railway/Vercel deployment guidance",
    ],
  },
  stack: [
    "React",
    "Vite",
    "FastAPI",
    "Python",
    "FAISS",
    "LangChain",
    "Groq",
    "Ollama",
  ],
  links: [
    {
      label: "SOURCE CODE",
      url: "https://github.com/bosspa01/solar-chat",
      kind: "code",
    },
  ],
  evidence: "GitHub README and rag_api.py",
};
