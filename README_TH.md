# BOSS Portfolio — โค้ด JSX แบบแยกหน้าบ้าน / หลังบ้าน

เว็บ Next.js + React (JavaScript / JSX) และ API Node.js + Express
ธีมดำ–ขาว–น้ำเงิน, แอนิเมชัน, โปรเจกต์จาก GitHub, และรูปโปรไฟล์ของคุณ

## คู่มืออ่านโค้ด

- เริ่มต้นทีละขั้น: [GUIDE_FOR_BEGINNERS_TH.md](GUIDE_FOR_BEGINNERS_TH.md)
- อธิบายโครงสร้างและโค้ดทุกส่วน: [CODE_GUIDE_TH.md](CODE_GUIDE_TH.md)

Component ใช้ `const Component = (...) => { ... };` และ `export default` ท้ายไฟล์
handler หลักใช้ชื่อขึ้นต้น `hdl` ให้ใกล้กับสไตล์โปรเจกต์ Camping โดยคงโครงไฟล์และระบบเดิม

## โครงสร้างโฟลเดอร์

```text
boss-portfolio-simple/
├── frontend/                 # หน้าบ้าน Next.js + React JSX
│   ├── public/
│   │   ├── images/
│   │   │   ├── boss-portrait.webp   # รูปโปรไฟล์ที่แต่งแล้ว (หน้าแรก)
│   │   │   └── boss-original.png    # รูปต้นฉบับ
│   │   └── project-shots/            # รูป Screenshot ของโปรเจกต์จริง
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.jsx              # หน้าแรก (Next.js บังคับชื่อไฟล์นี้)
│   │   │   └── layout.jsx            # โหลด CSS รวม
│   │   ├── components/
│   │   │   ├── PortfolioHome.jsx     # เรียกใช้ส่วนต่าง ๆ รวมกัน
│   │   │   ├── layout/               # Navbar และ Footer
│   │   │   ├── sections/             # หน้า Home/About/Projects/Skills/Contact
│   │   │   ├── projects/             # การ์ดโปรเจกต์, popup, รูปภาพ
│   │   │   ├── contact/              # ฟอร์มติดต่อ
│   │   │   └── ui/                   # เอฟเฟกต์ Fade in ตอนเลื่อน
│   │   ├── data/                     # ข้อมูลที่เปลี่ยนบ่อย
│   │   │   ├── profile.js            # ชื่อ อีเมล ประวัติ
│   │   │   ├── projects/             # แยกรายละเอียดแต่ละโปรเจกต์เป็นคนละไฟล์
│   │   │   ├── skills.js             # กลุ่มทักษะ
│   │   │   ├── languages/            # แยก th.js และ en.js
│   │   │   └── project-shots.json    # รายชื่อไฟล์รูปของโปรเจกต์
│   │   └── styles/                   # CSS แยกตามส่วน (hero.css, projects.css,...)
│   └── package.json
├── backend/                  # หลังบ้าน Node.js + Express
│   ├── server.js             # เปิดเซิร์ฟเวอร์ / ต่อ routes
│   ├── routes/               # contactRoutes.js (กำหนด URL)
│   ├── controllers/          # contactController.js (จัดการข้อความ)
│   ├── config/               # mailer.js (ตั้งค่าส่งอีเมล)
│   ├── utils/                # validateContact.js (ตรวจข้อมูล)
│   └── package.json
├── START_FRONTEND_WINDOWS.bat
└── START_BACKEND_WINDOWS.bat
```

## เปิดเว็บ (Windows / VS Code)

ต้องมี Node.js รุ่น 20.9 ขึ้นไป

**Terminal 1 — หลังบ้าน**

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

**Terminal 2 — หน้าบ้าน** (เปิด Terminal ใหม่)

```bash
cd frontend
npm install
npm run dev
```

เปิด http://localhost:3000

ตรวจ API หลังบ้านได้ที่ http://localhost:4000/api/health

> หากเปิดเฉพาะ frontend ก็ยังดูหน้า Portfolio ได้ แต่ฟอร์มติดต่อจะใช้งานไม่ได้จนกว่าจะเปิด Backend และตั้งค่า SMTP

### แก้อะไร ไปที่ไฟล์ไหน?

- เปลี่ยนชื่อ / อีเมล / ข้อความแนะนำตัว → `frontend/src/data/profile.js`
- เปลี่ยนภาพหน้าแรก → เอาภาพชื่อ `boss-portrait.webp` ไปแทนที่ใน `frontend/public/images/`
- ปรับหน้าแรก / ตำแหน่งภาพ → `frontend/src/components/sections/HeroSection.jsx`
- ปรับภาพและขนาดองค์ประกอบหน้าแรก → `frontend/src/styles/hero.css`
- เพิ่มโปรเจกต์ → `frontend/src/data/projects/` (เช่น `gamingGear.js`) และเพิ่มชื่อไฟล์ใน `projects/index.js`
- ปรับการ์ดโปรเจกต์ → `frontend/src/components/projects/ProjectCard.jsx`
- เพิ่มรูปภาพโปรเจกต์จริง → ใส่รูปใน `frontend/public/project-shots/` แล้วแก้ `frontend/src/data/project-shots.json`
- เปลี่ยนข้อความสองภาษา → `frontend/src/data/languages/th.js` และ `en.js`
- เปลี่ยนโทนสี → `frontend/src/styles/base.css` ดูตัวแปร `--blue` และ `--bg`
- แก้ฟอร์มหน้าบ้าน → `frontend/src/components/contact/ContactForm.jsx`
- แก้ API / ส่งเมล → `backend/controllers/contactController.js`

## Next.js ทำไมยังมี app/ ?

Next.js จำเป็นต้องมี `src/app/page.jsx` กับ `src/app/layout.jsx` สำหรับกำหนดหน้าเว็บ
**เราไม่เขียนหน้าเว็บทั้งหมดใน app/** แต่แยก Component ไปไว้ใน `src/components/` เหมือน React ทั่วไป

## โปรเจกต์และรูปภาพ

รูปที่ได้จากการแต่งรูปโปรไฟล์ใช้ใน Hero จริงแล้ว ภาพนี้เป็นภาพแต่งจากรูปที่คุณส่ง

รูปโปรเจกต์ที่ยังไม่มี Screenshot จริง เว็บไซต์ยังแสดง artwork ที่ออกแบบด้วย CSS
พร้อมข้อความบอกว่าไม่ใช่ Screenshot จริง ไม่อ้างว่าเป็นภาพจากการใช้งานจริง

ถ้าต้องการถ่ายภาพโปรเจกต์ Gaming Gear ที่ Deploy:

```bash
cd frontend
npm install
npm run screenshots:install
npm run capture:ecom
```

โปรแกรมจะลองจับภาพจริงและบันทึกเข้า `frontend/public/project-shots/` (ต้องมีอินเทอร์เน็ต)

## การส่งข้อความจากฟอร์ม

สร้างไฟล์ `backend/.env` โดยคัดลอก `.env.example` และเติม SMTP ให้ครบ
ถ้าไม่ตั้งค่า จะมีข้อความแจ้งให้ติดต่อผ่านอีเมลโดยตรง **ไม่แจ้งว่าส่งสำเร็จปลอม ๆ**

## สรุปงานปรับโครงสร้าง

- แยก Frontend และ Backend เป็น 2 โปรเจกต์จริง ๆ (ติดตั้ง npm แยกกัน)
- แยก JSX หลักจากไฟล์เดียวเป็นหลาย Component ตามหน้าที่
- แยก CSS ตาม Section
- ใช้ JS/JSX ไม่ใช้ TypeScript
- มีภาพโปรไฟล์จริงและภาพตกแต่งในหน้าแรก
- ยังรักษาฟีเจอร์และสไตล์ของเวอร์ชันเดิมไว้
