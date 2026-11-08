# เริ่มอ่านโค้ด Portfolio แบบเข้าใจง่าย

เป้าหมายคือ **คุณไม่จำเป็นต้องเข้าใจทุกไฟล์พร้อมกัน** ให้เริ่มจากไฟล์ที่สั้นและใกล้ตัวที่สุดก่อน

โค้ดปรับรูปแบบ component และ handler ให้ใกล้ Camping แล้ว แต่ยังใช้ Next.js และโครงไฟล์เดิม
ถ้าต้องการรายละเอียดของทุกไฟล์ อ่าน [CODE_GUIDE_TH.md](CODE_GUIDE_TH.md) ควบคู่กับคู่มือนี้

## 1. หน้าเว็บทำงานยังไง?

เปิด 3 ไฟล์นี้ตามลำดับ

1. `frontend/src/app/page.jsx` — Next.js ใช้ไฟล์นี้เป็นหน้า `/`
2. `frontend/src/components/PortfolioHome.jsx` — เหมือน `App.jsx` ใน React รวมทุก Section เข้าด้วยกัน
3. `frontend/src/components/sections/HeroSection.jsx` — โค้ดของหน้าแรกจริง ๆ

ดูที่ `PortfolioHome.jsx` จะเห็นว่าเรียก Component แยกกันตรง ๆ:

```jsx
<HeroSection lang={lang} t={t} />
<AboutSection lang={lang} t={t} />
<ProjectsSection lang={lang} t={t} onOpenProject={setSelectedProject} />
```

ตรงนี้ไม่มีเทคนิคพิเศษ เป็น React Components + Props ปกติ

## 2. คำพื้นฐานที่เจอ

- `component` = ฟังก์ชันที่ return หน้าตา JSX
- `props` = ข้อมูลที่ส่งจาก Component แม่ให้ลูก เช่น `lang`, `t`
- `useState()` = จำค่าที่เปลี่ยนได้ เช่น ภาษาไทย/อังกฤษ, เปิด/ปิดเมนู
- `.map()` = วนสร้างการ์ดหลายใบจาก Array
- `.filter()` = เลือกเฉพาะโปรเจกต์ของหมวดนั้น
- `className` = ชื่อคลาส CSS สำหรับแต่งสี ขนาด และเอฟเฟกต์
- `motion` = ไลบรารีแอนิเมชันฟรี (ไม่จำเป็นต้องแก้ หากยังไม่คุ้น)

## 3. แก้รูปภาพ

รูปหน้าแรกอยู่ที่ `frontend/public/images/boss-portrait.webp`

ใน `HeroSection.jsx` จะมี

```jsx
<img className="hero-portrait" src="/images/boss-portrait.webp" alt="Boss" />
```

ขนาด / ขอบ / ฟีลการตกแต่งอยู่ที่ `frontend/src/styles/hero.css` ในคลาส `.hero-portrait`

## 4. เพิ่มโปรเจกต์อีก 1 งาน

1. คัดลอกไฟล์ใน `frontend/src/data/projects/` เช่น `gamingGear.js`
2. ตั้งชื่อไฟล์ใหม่ เช่น `myChatbot.js`
3. เปลี่ยน `id`, `title`, `subtitle`, `detail`, `features`, `stack`, `links`
4. ไปที่ `frontend/src/data/projects/index.js` แล้ว `import` ไฟล์ใหม่และใส่ใน array `projects`

หน้า Projects จะเพิ่มการ์ดเองโดยอัตโนมัติ ไม่ต้องเพิ่ม JSX ใน `ProjectsSection.jsx`

## 5. ทำไมหลังบ้านแยกหลายไฟล์?

เมื่อผู้ใช้กดส่งฟอร์ม จะทำงานตามลำดับนี้:

```text
frontend/ContactForm.jsx
       │  fetch('/api/contact')
       ▼
backend/server.js
       │  app.use('/api/contact', contactRoutes)
       ▼
backend/routes/contactRoutes.js
       │  router.post('/', sendContact)
       ▼
backend/controllers/contactController.js
       │  ตรวจข้อมูล → ส่งอีเมล
       ▼
backend/config/mailer.js
```

เหมือนการแยก Controller / Routes ที่ใช้กับ Express ทั่วไป

## 6. อยากปรับ CSS เริ่มที่ไหน?

- สีหลัก / ฟอนต์ / background: `styles/base.css`
- หน้าแรกและรูปโปรไฟล์: `styles/hero.css`
- การ์ดผลงาน: `styles/projects.css`
- มือถือและแท็บเล็ต: `styles/responsive.css`
- แอนิเมชัน CSS: `styles/animations.css`

## 7. ลำดับที่แนะนำให้ลองแก้

1. เปลี่ยนข้อความแนะนำตัวใน `data/profile.js`
2. เปลี่ยนชื่อโปรเจกต์ใน `data/projects/`
3. ลองปรับ `--blue` ใน `styles/base.css`
4. ลองแก้ layout `HeroSection.jsx`
5. ศึกษาฟอร์ม `ContactForm.jsx` และ API `contactController.js`

> ไม่จำเป็นต้องเรียนรู้ Motion หรือ CSS 3D ก่อนถึงจะปรับข้อมูลและเพิ่มโปรเจกต์ได้
