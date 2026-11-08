import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import contactRoutes from './routes/contactRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;
if (process.env.TRUST_PROXY === '1') app.set('trust proxy', 1);

// กำหนดว่าเว็บไซต์ไหนเรียก API ได้บ้าง
const origins = (process.env.FRONTEND_ORIGINS || 'http://localhost:3000').split(',').map((origin) => origin.trim()).filter(Boolean);
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: origins }));
app.use(express.json({ limit: '16kb' }));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Backend is running' });
});

// แยกเส้นทาง Contact ไปเป็นอีกไฟล์
app.use('/api/contact', contactRoutes);

app.use((error, req, res, next) => {
  console.error('Server error:', error.message);
  res.status(500).json({ ok: false, message: 'เกิดข้อผิดพลาดในระบบ' });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
