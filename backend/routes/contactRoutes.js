import { Router } from "express";
import rateLimit from "express-rate-limit";
import { sendContact } from "../controllers/contactController.js";

const router = Router();

// ไม่ให้ส่งถี่เกินไป: 5 ครั้ง / 15 นาที
const limitContact = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { ok: false, message: "ส่งข้อความบ่อยเกินไป กรุณาลองใหม่" },
});

router.post("/", limitContact, sendContact);
export default router;
