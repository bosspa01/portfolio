# อ่านโค้ด BOSS Portfolio ทีละส่วน

คู่มือนี้อธิบายไฟล์ที่เราเขียนและไฟล์ตั้งค่าทั้งโปรเจกต์ รวมถึง JavaScript/JSX, CSS, API, ข้อมูล, รูปภาพ และสคริปต์เปิดโปรแกรม ไม่ไล่อธิบายโค้ดของไลบรารีใน `node_modules` หรือไฟล์ที่ Next.js สร้างใน `.next` เพราะสองส่วนนี้ถูกสร้างจาก dependencies และซอร์สของเราอีกที

## 1. สิ่งที่ปรับให้ใกล้ Camping

ใน Camping ส่วนใหญ่ประกาศ component แบบนี้:

```jsx
const Home = () => {
  return <div>...</div>;
};
export default Home;
```

พอร์ตจึงเปลี่ยน component ให้เป็นรูปแบบเดียวกัน และแยก `export default` ไว้ท้ายไฟล์ ใช้ handler ชื่อ `hdlSubmit`, `hdlCopyEmail`, `hdlGoToSection` และเขียนการวนรายการแบบมี `return`:

```jsx
{visibleProjects.map((project) => {
  return <ProjectCard key={project.id} project={project} />;
})}
```

backend ใช้ `export const sendContact = async (req, res) => { ... };` ให้รูปร่างฟังก์ชันใกล้กับ controller ใน Camping แต่คง `import/export` ตาม `type: "module"` เดิม ไม่เปลี่ยนเป็น `require/exports` เพราะจะต้องเปลี่ยนระบบ module ของหลายไฟล์ไปพร้อมกัน

ยังใช้ Next.js, fetch, React state และ CSS เดิม การใส่ React Router, Zustand, Axios หรือ Tailwind เพิ่มเพียงเพื่อให้ชื่อเครื่องมือเหมือน Camping จะเพิ่มงานย้ายระบบ จึงไม่ได้ทำในรอบนี้ โครงไฟล์ หน้าเว็บ ข้อมูลผลงาน รูปภาพ และ className เดิมยังใช้ต่อได้

Arrow function และ function declaration ไม่เหมือนกันทุกกรณี เช่น hoisting, `this` และ `arguments` แต่ฟังก์ชันที่ปรับในงานนี้ไม่ได้ใช้พฤติกรรมเหล่านั้น และถูกเรียกหลังประกาศแล้ว

## 2. ภาพรวมการทำงาน

```text
ผู้เข้าชมเปิด / บน Next.js (ปกติ port 3000)
  src/app/layout.jsx       โหลด CSS และครอบหน้าเว็บด้วย html/body
  src/app/page.jsx         เลือกหน้าแรก
    PortfolioHome.jsx      เก็บภาษาและโปรเจกต์ที่เปิดดู
      Navbar
      Hero → Marquee → About → Projects → Skills → Journey → Contact
      Footer
      ProjectDialog        popup แสดงรายละเอียดผลงาน

ข้อมูลที่อ่านมาแสดง: src/data/
หน้าตา: src/styles/
รูปที่เข้าผ่าน URL ได้: public/

ContactForm → POST /api/contact
  next.config.mjs         ส่งต่อ /api/* ไป backend (ปกติ port 4000)
  backend/server.js       middleware และ route หลัก
  routes/contactRoutes.js จำกัดความถี่
  controllers/contactController.js ตรวจข้อมูลและจัดการส่งเมล
  utils/validateContact.js ตรวจช่องกรอก / escape HTML
  config/mailer.js        สร้างตัวส่งอีเมล SMTP ด้วย Nodemailer
```

พอร์ตนี้แสดงรายละเอียดโปรเจกต์อื่น แต่ไม่ได้รัน FoodApp, Solar AI หรือบอทอยู่ข้างใน มันอ่านข้อมูลจากไฟล์แล้วแสดงการ์ด รูป และลิงก์ไปหาแต่ละโปรเจกต์

## 3. โครงโฟลเดอร์เดิม

```text
boss-portfolio-simple/
├── frontend/
│   ├── src/
│   │   ├── app/                  จุดเข้า Next.js
│   │   ├── components/
│   │   │   ├── PortfolioHome.jsx รวมทุกส่วน
│   │   │   ├── layout/           Navbar / Footer
│   │   │   ├── sections/         ส่วนต่าง ๆ ของหน้า
│   │   │   ├── projects/         การ์ด รูป popup และ artwork
│   │   │   ├── contact/          ฟอร์มติดต่อ
│   │   │   └── ui/               Reveal
│   │   ├── data/                 ข้อมูลที่ใช้ render
│   │   └── styles/               CSS แยกตามส่วน
│   ├── public/                   รูปโปรไฟล์ รูปผลงาน favicon
│   ├── scripts/                  สคริปต์จับภาพ
│   ├── package.json / package-lock.json
│   ├── jsconfig.json
│   ├── next.config.mjs
│   └── .env.example
├── backend/
│   ├── server.js
│   ├── routes/contactRoutes.js
│   ├── controllers/contactController.js
│   ├── config/mailer.js
│   ├── utils/validateContact.js
│   ├── package.json / package-lock.json
│   └── .env.example              ตัวอย่าง ไม่ใช่รหัสจริง
├── START_FRONTEND_WINDOWS.bat
├── START_BACKEND_WINDOWS.bat
├── README_TH.md
├── GUIDE_FOR_BEGINNERS_TH.md
└── CODE_GUIDE_TH.md              คู่มือฉบับนี้
```

เทียบกับ Camping: `frontend` ใกล้เคียง `client`, `backend` ใกล้เคียง `server`, `PortfolioHome` ทำหน้าที่รวมหน้าเหมือน component หลัก ส่วน `src/app` เป็นจุดเข้าเฉพาะของ Next.js จึงยังต้องเก็บไว้

## 4. พื้นฐานที่ใช้ซ้ำในทุกไฟล์ JSX

- `import X from "..."` รับ default export ส่วน `{ X }` รับ named export
- `@/` หมายถึง `frontend/src/` ตาม `jsconfig.json` ส่วน `./` และ `../` นับจากไฟล์ปัจจุบัน
- `const Component = ({ lang, t }) => { ... }` รับ props ที่แม่ส่งมา โดย destructuring ชื่อออกมาใช้
- `return (...)` คืน JSX ให้ React render ส่วน `{...}` ใน JSX คือจุดที่ใช้ JavaScript
- `className` เชื่อมกับ selector ใน CSS และ `style={{ ... }}` เป็น object ของ inline style
- `condition && <X />` แสดง X เมื่อเงื่อนไขเป็นจริง ส่วน `condition ? A : B` เลือกระหว่างสองค่า
- `.map()` เปลี่ยนข้อมูลหนึ่งรายการเป็น JSX หนึ่งชิ้น ต้องมี `key` ที่แยกแต่ละรายการได้
- `.filter()` เลือกข้อมูลที่ตรงเงื่อนไข โดยไม่แก้ array ต้นฉบับ
- `useState(initial)` คืนค่าปัจจุบันกับ setter; เรียก setter แล้ว React render ใหม่
- `useEffect(callback, dependencies)` ใช้งานที่ต้องทำหลัง render; เปลี่ยน dependency แล้วทำใหม่ และคืนฟังก์ชัน cleanup เพื่อเก็บกวาด listener/ค่าที่เปลี่ยนไว้
- `onClick={hdlSubmit}` ส่งฟังก์ชันไปให้ React เรียก ส่วน `onClick={() => hdlSubmit(item)}` ใช้เมื่อต้องส่ง argument เพิ่ม
- `"use client"` ระบุขอบเขต component ฝั่ง client ของ Next.js เพื่อใช้ state, effect, event handler และ browser API; component ลูกที่ถูก import ภายใต้ขอบเขตนี้ไม่จำเป็นต้องมีข้อความนี้ทุกไฟล์
- `motion.div` คือ div ที่ Motion จัดแอนิเมชันให้ ไม่ใช่ HTML tag ใหม่ที่ต้องสร้างเอง

## 5. จุดเข้าและตัวรวมหน้า

### `frontend/src/app/page.jsx`

import `PortfolioHome` แล้วคืน `<PortfolioHome />` เท่านั้น Next.js ใช้ชื่อ `page.jsx` ในโฟลเดอร์นี้เป็นหน้า `/` จึงไม่ต้องสร้าง `<Routes>` แบบ Camping

### `frontend/src/app/layout.jsx`

import CSS ทั้ง 11 ไฟล์เรียงตามที่เขียน จากนั้นประกาศ `metadata` สำหรับ title และ description ของหน้า และ `RootLayout` รับ `children` มาวางใน `<html lang="th"><body>...</body></html>`

ไฟล์นี้ยังเป็น server component เพราะ export metadata และไม่มี state/handler ภาษาใน `<html>` ตั้งเป็น `th` คงที่ ปุ่มสลับภาษาเปลี่ยนข้อความในหน้า ไม่ได้เปลี่ยน attribute นี้

ลำดับ import CSS มีผลเมื่อ selector มีความสำคัญเท่ากัน กฎในไฟล์ที่โหลดทีหลังจึงอาจทับไฟล์ก่อนหน้า โดย `project-screenshots.css` โหลดหลัง responsive เพื่อปรับส่วนแกลเลอรีเพิ่มเติม

### `frontend/src/components/PortfolioHome.jsx`

เป็นจุดรวมหน้าและมี state สองตัว:

| ตัวแปร | ค่าเริ่มต้น | หน้าที่ |
|---|---|---|
| `lang` | `"th"` | ภาษา `th` หรือ `en` |
| `selectedProject` | `null` | object โปรเจกต์ที่เปิด popup; null คือปิด |
| `t` | `translations[lang]` | object ข้อความภาษาปัจจุบัน เป็นค่าที่คำนวณใหม่ตอน render ไม่ใช่ state เพิ่ม |

ส่ง `setLang` ให้ Navbar เปลี่ยนภาษา, ส่ง `setSelectedProject` ผ่านชื่อ prop `onOpenProject` ให้ ProjectsSection และส่ง `onClose={() => setSelectedProject(null)}` ให้ popup

ตัวอย่างเส้นทางการกด: การ์ดเรียก `onOpen()` → ProjectsSection ส่ง project ให้ `onOpenProject(project)` → state ในแม่เปลี่ยน → ProjectDialog ได้ project แล้วแสดงเนื้อหา เมื่อปิด state กลับเป็น null

ตัวเว็บไม่มี global store เพราะข้อมูลที่แชร์หลักมีแค่ภาษาและ popup การส่ง props ยังสั้นพอ ส่วนการกรองและฟอร์มเก็บ state ใกล้จุดใช้งาน

## 6. Layout

### `components/layout/Navbar.jsx`

props คือ `lang`, `setLang`, `t`; state คือ `menuOpen` กับ `activeSection` ส่วน `nav` เป็น array ของ anchor id `home/about/work/skills/contact`

`hdlGoToSection(id)` ตั้งเมนูที่เลือกและปิดเมนูมือถือ ลิงก์ `href="#work"` เป็นต้นทำหน้าที่เลื่อนหน้า ส่วน handler ไม่ได้สั่ง scroll เอง CSS ของ html ทำให้เลื่อนแบบ smooth

desktop และ mobile ต่าง `.map()` จาก nav ชุดเดียวกัน ใช้ index อ่าน `t.nav[index]` ดังนั้นลำดับ array ของคำแปลต้องตรงกัน ปุ่มภาษาเรียก `setLang(lang === "th" ? "en" : "th")` และปุ่มมือถือสลับ menuOpen

`aria-expanded` ช่วยบอกสถานะเมนูกับเครื่องมือช่วยอ่าน `activeSection` เปลี่ยนตามการคลิกลิงก์ใน Navbar ไม่ได้ติดตามตำแหน่ง scroll อัตโนมัติ

### `components/layout/Footer.jsx`

รับ `t` เพื่อแสดงข้อความท้ายเว็บ อ่านอีเมล/GitHub จาก profile และมีลิงก์กลับ `#home` ชื่อกับปีใน JSX เป็นข้อความคงที่ ถ้าแก้ชื่อใน profile อย่างเดียว ข้อความที่ hardcode ใน Footer จะไม่เปลี่ยนตาม

`target="_blank"` เปิดลิงก์ภายนอกแยกแท็บ และ `rel="noopener noreferrer"` ใช้กำกับลิงก์เหล่านั้น ส่วน `mailto:` ให้โปรแกรมอีเมลของผู้ชมจัดการ

## 7. Section ทุกส่วน

### `components/sections/HeroSection.jsx`

รับ `lang` และ `t` ไม่มี state ประกอบด้วยพื้นหลัง/เส้นตกแต่ง, ข้อความด้านซ้าย, ภาพโปรไฟล์ด้านขวา และแถบสถานะด้านล่าง

- ข้อความจากคำแปลใช้ `t.hello`, `t.explore`, `t.contact`, `t.status` เป็นต้น
- แนะนำตัวใช้ `profile.intro[lang]` และลิงก์อ่านจาก `profile.github/email`
- คำใหญ่ BUILD/CREATE/EVOLVE, ชื่อที่อยู่บนกรอบรูป และโค้ดจำลอง `developer.jsx` เป็นข้อความตกแต่งใน JSX ไม่ได้สั่งรันโค้ดที่มองเห็นบนการ์ด
- รูปใช้ `/images/boss-portrait.webp` ซึ่งชี้ไปที่ public/images โดยไม่ใส่ public ใน URL
- `initial`, `animate`, `transition` กำหนดจุดเริ่ม จุดปลาย และระยะเวลาแอนิเมชัน มีทั้งการเลื่อน ความโปร่งใส scale และ rotate
- วงโคจร การ์ดลอย และมุมกรอบสร้างจาก div/span และ CSS ไม่ใช่ภาพ PNG แยก
- ปุ่มใช้ anchor ไป work/contact/about ส่วนลูกศรมาจาก lucide-react

### `components/sections/Marquee.jsx`

ไม่มี props/state สร้างข้อความชุดเดิมสองรอบด้วย `Array.from({ length: 2 })` แล้ว map เป็นสอง div เพื่อให้ CSS เลื่อนแถบข้อความได้ต่อเนื่อง index ใช้เป็น key ได้ในกรณีนี้เพราะรายการตกแต่งคงที่

### `components/sections/AboutSection.jsx`

รับ `lang/t` ใช้ Reveal ครอบหัวข้อและสองคอลัมน์ ด้านซ้ายเป็นคำโปรย ด้านขวาแสดง `profile.about[lang]`, มหาวิทยาลัย, สาขา และตำแหน่งที่ตั้ง

ตัวเลข 05+, GPA 3.60 และปี 2023 ในส่วนสถิติยังเขียนไว้ใน JSX โดยตรง ไม่ได้อ่านจากจำนวน projects หรือ profile.gpa/startYear อัตโนมัติ เมื่อเปลี่ยนข้อมูลเหล่านั้นให้ตรวจข้อความใน section นี้ด้วย

### `components/sections/ProjectsSection.jsx`

รับ `lang/t/onOpenProject`; state `filter` เริ่มที่ all; import array projects จาก data/projects

`visibleProjects` เป็นผลของ `.filter()` ใหม่ทุกรอบ: all เก็บทุกตัว, ai เก็บ category ai และ bot, ตัวเลือกที่เหลือใน UI คือ fullstack จึงเก็บ category fullstack

`categories` เก็บ id และป้ายคำแปลของปุ่มกรอง ปุ่มเรียก setFilter แล้ว map visibleProjects ใหม่ ถ้า project.featured เป็น true จะเพิ่ม class wide ให้การ์ดกินพื้นที่มากขึ้น

ส่ง `onOpen={() => onOpenProject(project)}` ไป ProjectCard เพื่อรู้ว่าคลิกโปรเจกต์ไหน ตัว section ไม่ได้เก็บ selectedProject ซ้ำกับแม่

### `components/sections/SkillsSection.jsx`

รับ `t`, อ่าน skills เป็นกลุ่ม และใช้ `skillIcons` จับคู่ชื่อ icon กับ React component เช่น layout → Layers3 ส่วน `const Icon = skillIcons[group.icon]` เลือกตัวที่ใช้ก่อน render `<Icon />`

map ชั้นแรกสร้างการ์ดกลุ่ม ชั้นที่สองสร้างป้ายทักษะ `delay={index * 0.06}` ทำให้การ์ดค่อย ๆ ปรากฏเหลื่อมเวลากัน ส่วน footnote ใช้ `t.nextNote` เพื่ออธิบายการใช้ Next.js ในพอร์ต

### `components/sections/JourneySection.jsx`

รับ `t` ไม่มี state แสดง timeline สามช่วง: เริ่มเรียน, สร้างโปรเจกต์, สถานะปัจจุบัน ใช้ Reveal แต่ละแถว ข้อความอ่านจาก step1/step1desc จนถึง step3/step3desc ส่วนปีใน JSX เป็นค่าคงที่

### `components/sections/ContactSection.jsx`

รับ `lang/t`; state copied ใช้แสดงไอคอนและข้อความหลังคัดลอกอีเมล

`hdlCopyEmail` เป็น async handler: รอ `navigator.clipboard.writeText(profile.email)` → ตั้ง copied=true → setTimeout 1,800 ms ให้กลับ false ถ้า browser คัดลอกไม่ได้จะเปลี่ยนไป mailto แทน

ด้านซ้ายเป็นข้อมูลติดต่อและ GitHub ด้านขวาเรียก `<ContactForm lang={lang} />` ฟอร์มจึงมี state และการส่งข้อมูลของตัวเอง

### `components/ui/Reveal.jsx`

รับ children, className (ค่าเริ่มต้นเป็นสตริงว่าง) และ delay (เริ่มที่ 0) แล้วครอบด้วย motion.div

`useReducedMotion()` ตรวจ preference ลดแอนิเมชัน ถ้าต้องการลดจะให้ initial=false ส่วนทั่วไปเริ่ม opacity 0/y 34 แล้ว whileInView ให้ opacity 1/y 0

`viewport={{ once: true, amount: 0.13 }}` เล่นเมื่อเข้า viewport ตามสัดส่วนที่กำหนดและเล่นครั้งเดียว ส่วน transition ระบุเวลา 0.72 วินาที เส้นโค้ง ease และ delay ที่แม่ส่งมา

## 8. การ์ด รายละเอียด และภาพผลงาน

### `components/projects/ProjectCard.jsx`

รับ project/onOpen/lang; `text = translations[lang]` ใช้สร้าง label ตามภาษา ไม่มี state ภายใน

article เพิ่ม class ตาม featured; ปุ่มรูปกับปุ่มชื่อเรียก onOpen ชุดเดียวกัน; ProjectMedia ตัดสินใจเรื่องภาพ; เนื้อหาแสดง number/type/forked/title/subtitle และ `project.stack.slice(0, 4)` แสดงทักษะสี่ตัวแรกเท่านั้น รายการเต็มอยู่ใน popup

### `components/projects/ProjectDialog.jsx`

รับ project/lang/onClose; เมื่อ project เป็น null จะไม่มี popup ใน AnimatePresence เมื่อมี project จะสร้าง backdrop และ motion.section ที่มี role=dialog/aria-modal

effect ผูกกับ project/onClose: ถ้าไม่มี project ให้หยุด; ถ้ามีให้เพิ่ม keydown listener ปิดเมื่อ Escape, จำค่า body overflow เดิม แล้วตั้ง hidden กันหน้าเบื้องหลังเลื่อน cleanup จะถอด listener และคืน overflow เดิม

คลิก backdrop ปิดเฉพาะเมื่อ `event.target === event.currentTarget` จึงไม่ปิดเมื่อกดภายในกล่อง ปุ่ม X เรียก onClose เช่นกัน AnimatePresence ช่วยให้ exit animation ทำงานก่อนเอากล่องออก

เนื้อหาอ่าน detail/features ตาม lang, map stack ทั้งหมด, แสดงหมายเหตุแหล่งข้อมูล และถ้า forked ให้ลิงก์ upstream จากนั้น map links เป็นปุ่ม code/live ตาม item.kind ปุ่มแรกได้สีหลัก ส่วนลิงก์ที่ไม่มีใช้ array ว่างด้วย `project.links || []`

### `components/projects/ProjectMedia.jsx`

รับ project/lang/large โดย large เริ่ม false; `images = screenshots[project.id] || []` อ่านรายการรูปของโปรเจกต์; state active เริ่ม 0 และ effect คืนเป็น 0 เมื่อ project.id เปลี่ยน

ถ้า images ว่างจะคืน ProjectArtwork และในมุมมอง large จะแสดงคำกำกับว่าเป็นภาพประกอบ ถ้ามีรูปจะคืน img จาก images โดยใช้ Math.min กัน index เกินขอบ array

large=true และมีมากกว่าหนึ่งรูปจึงแสดงปุ่มเลขภาพ คลิกแล้ว setActive(index) ป้ายภาพจริงแสดงเฉพาะมุมมอง large เช่นกัน `loading="lazy"` ชะลอโหลดรูปจนใกล้ตำแหน่งแสดง

การใส่รูปจริงต้องมีทั้งไฟล์และ path ใน JSON โค้ดไม่ได้ตรวจว่าเป็นภาพจริงทางเทคนิค ถ้าพิมพ์ path ผิด img จะโหลดไม่สำเร็จ และยังไม่มี fallback อัตโนมัติเมื่อ URL ของรูปเสีย

### `components/projects/ProjectArtwork.jsx`

รับ variant แล้วใช้ if เลือก JSX ตามชนิด โดยไม่มี state/API:

| variant | สิ่งที่วาดด้วย HTML/CSS |
|---|---|
| commerce | หน้าร้านจำลอง แถบ browser และหูฟัง |
| solar | ดวงอาทิตย์ วงแสง และช่องคำถาม |
| anime | หน้าต่างแชตและการ์ดแนะนำอนิเมะจำลอง |
| meeting | หน้าต่างเสียง คลื่น และเส้นสรุปข้อความ |
| ค่าอื่น/food | โทรศัพท์และหน้าอาหารจำลอง |

ใน meeting array ตัวเลขคือความสูงแต่ละแท่ง map เป็น span และใช้ index คำนวณ animationDelay ส่วนข้อความ คะแนน/แชตตกแต่งใน artwork ไม่ใช่ผลจาก API ของโปรเจกต์จริง

## 9. ฟอร์มติดต่อ: `components/contact/ContactForm.jsx`

รับ lang แล้วเลือก t จาก translations เก็บ state สามกลุ่ม:

| state | หน้าที่ |
|---|---|
| status | idle, loading, success, unconfigured หรือ error |
| values | object ของ name/email/message/company |
| responseText | ข้อความแจ้งผลใต้ปุ่ม |

แต่ละช่องเป็น controlled input: value อ่านจาก state และ onChange เขียนค่าใหม่ด้วย `setValues({ ...values, name: e.target.value })` การ spread เก็บช่องอื่นไว้ก่อนทับเฉพาะช่องที่เปลี่ยน เหมือนการอัปเดต object ใน React ทั่วไป

ช่อง name/email/message มี required และขอบเขตความยาวตาม HTML; email ใช้ type=email ขณะที่ company เป็นช่องซ่อนสำหรับดักบอท ตั้ง tabIndex=-1 ไม่ให้ผู้ใช้เลื่อน focus ไปกรอกตามปกติ

`hdlSubmit(event)` ทำงานตามลำดับ:

1. preventDefault ไม่ให้ browser submit/reload เอง แล้วตั้ง status=loading
2. fetch POST `/api/contact` พร้อม Content-Type application/json และ JSON.stringify(values)
3. อ่าน JSON จาก response แล้วดูทั้ง HTTP status และ data.ok
4. สำเร็จ: แสดงคำแปล sent และล้าง values ทั้งสี่ช่อง
5. code MAIL_NOT_CONFIGURED หรือ HTTP 503: แสดงทางเลือกส่งอีเมลโดยตรง
6. ข้อผิดพลาดอื่น: ใช้ data.message ถ้ามี ไม่เช่นนั้นใช้ t.error
7. ถ้าเรียก API หรือ parse JSON ไม่สำเร็จ: เข้า catch และแสดงข้อความทางเลือกเช่นกัน

ปุ่ม disabled ระหว่าง loading ป้องกันกดซ้ำ ส่วน role=status ทำให้เครื่องมือช่วยอ่านรับรู้ผลตอบกลับ ลิงก์ mailto อยู่ด้านล่างตลอดและไม่ต้องพึ่ง backend

ฟอร์มใช้ fetch เดิม เพราะมี request หลักเพียงจุดเดียว จึงยังไม่เพิ่ม axios หรือโฟลเดอร์ api แบบ Camping

## 10. ข้อมูลทั้งหมดใน `src/data`

### `profile.js`

named export `profile` เป็น object ข้อมูลส่วนตัว: firstName/lastName/nickname/role, email/github, university/major/startYear/gpa และข้อมูลสองภาษา location/status/intro/about

ข้อมูลสองภาษาอ่านด้วย `[lang]` เช่น profile.about.th เท่ากับ profile.about["th"] ข้อมูลเป็นไฟล์ static เปลี่ยนแล้วต้องให้ Next.js โหลดข้อมูลใหม่ ไม่ได้บันทึกผ่านหน้า admin

บาง field เตรียมไว้แต่ component ยังไม่ได้อ่านทุกตัว และบางจุดยังมีชื่อ/ตัวเลข hardcode ใน JSX จึงไม่ควรคิดว่าแก้ profile แล้วทุกตัวอักษรในหน้าเปลี่ยนอัตโนมัติ

### `skills.js`

export array skills สี่กลุ่ม FRONTEND/BACKEND/DATABASE/AI & TOOLS แต่ละ object มี name, icon (key ของ skillIcons) และ items (array ของชื่อเครื่องมือ) ถ้าเพิ่ม icon ใหม่ต้องเพิ่ม mapping ใน SkillsSection ด้วย

### `languages/th.js`, `languages/en.js`, `languages/index.js`

th.js/en.js export object ที่ใช้ key ตรงกัน ส่วน index.js import ทั้งคู่แล้ว export `translations = { th, en }`

กลุ่ม key แบ่งตามจุดใช้งาน: nav/hello/explore/contact เป็นเมนูและ Hero, about* เป็น About, work*/all/fullstack/ai เป็น Projects, skills* เป็น Skills, journey*/step* เป็น timeline, contact*/form*/sending/sent/error เป็นฟอร์ม และ visualNote/screenshotNote/sourceNote/forkNote เป็นภาพและหมายเหตุโปรเจกต์

เช่น `translations[lang].formName` เลือก label ของชื่อ ส่วน object ของ project เก็บคำบรรยายสองภาษาของมันเอง จึงไม่ได้รวมคำบรรยายทุกโปรเจกต์ไว้ในไฟล์ภาษาเหล่านี้

บาง key เช่นข้อความ Hero รุ่นเก่ายังคงอยู่ในข้อมูลแต่ไม่ได้ถูกใช้ใน JSX ปัจจุบัน การมี key ในไฟล์ไม่ได้หมายความว่าจะเห็นข้อความนั้นทุกครั้ง

### `projects/index.js`

import ข้อมูลจากห้าไฟล์แล้ว export array projects ลำดับใน array คือลำดับการ์ดที่หน้าเว็บใช้ ต้องเพิ่ม import และใส่ object ใน array เมื่อเพิ่มโปรเจกต์ ไม่ใช่สร้างไฟล์แล้วจะถูกอ่านเองอัตโนมัติ

### รูปแบบ object ของโปรเจกต์

| field | หน้าที่ |
|---|---|
| id | เชื่อมกับ screenshots และใช้เป็น React key ต้องไม่ซ้ำ |
| number/title/type | เลข ชื่อ และป้ายประเภทที่แสดง |
| category | ใช้กรอง fullstack/ai/bot |
| visual | เลือก artwork เมื่อยังไม่มีภาพจริง |
| featured | กำหนดการ์ดเด่น/กว้าง |
| subtitle/detail | object th/en สำหรับคำโปรยและรายละเอียด |
| features | object th/en แต่ละภาษาเป็น array ของฟีเจอร์ |
| stack | array ชื่อเทคโนโลยี |
| links | array label/url/kind ใช้สร้างปุ่ม |
| forked/upstream | เปิดหมายเหตุ fork และลิงก์ต้นฉบับ |
| evidence | หมายเหตุในข้อมูลเกี่ยวกับหลักฐาน ปัจจุบันไม่ได้ render field นี้โดยตรง |

### แต่ละไฟล์โปรเจกต์

| ไฟล์ | export / id | เนื้อหาที่เก็บ |
|---|---|---|
| gamingGear.js | gamingGear / gaming-store | ร้านเกมมิ่ง, featured, fullstack, ลิงก์ live/frontend/backend |
| solarChatbot.js | solarChatbot / solar-chatbot | Solar RAG, featured, ai, ลิงก์ repository |
| animeDiscordBot.js | animeDiscordBot / anime-bot | บอท Discord, bot, forked/upstream |
| lineMeetingBot.js | lineMeetingBot / meeting-summary | บอทสรุปเสียง LINE, ai, forked/upstream |
| foodApp.js | foodApp / food-app | สั่งอาหารหลายบทบาท, fullstack, ลิงก์ repository |

ทั้งห้าไฟล์เป็นข้อมูลสำหรับเล่าโปรเจกต์ ไม่ใช่ implementation ของร้านค้า, AI, Discord, LINE หรือระบบอาหาร หากแก้ stack ในนี้จะเปลี่ยนแค่สิ่งที่แสดงในพอร์ต

### `project-shots.json`

object ที่ key คือ project.id และ value คือ array URL ภาพ เช่น `"solar-chatbot": ["/project-shots/solar-chatbot/chat.png"]` array ว่างหมายถึงใช้ artwork แต่ละ URL ต้องเริ่มจาก public root ไม่ใส่ `frontend/public` ลงใน URL

JSON ใช้ double quotes และใส่ comment ไม่ได้ ถ้าจะเพิ่มหลายภาพให้ใส่ comma ระหว่างรายการ ลำดับ array คือเลขปุ่มภาพใน popup

## 11. Backend ทีละไฟล์

### `backend/server.js`

1. import dotenv/config โหลด `.env` เข้า process.env และ import Express/CORS/Helmet/contactRoutes
2. สร้าง app และเลือก PORT จาก env ถ้าไม่มีใช้ 4000; TRUST_PROXY=1 ตั้งให้เชื่อ reverse proxy หนึ่งระดับ
3. อ่าน FRONTEND_ORIGINS คั่นด้วย comma แล้ว split → trim → filter เอาค่าว่างออก
4. ปิด x-powered-by, เพิ่ม security headers ด้วย helmet, จำกัด browser origins ด้วย cors และรับ JSON ขนาดไม่เกิน 16kb
5. GET `/api/health` คืน ok=true ไว้ตรวจสถานะ
6. app.use(`/api/contact`, contactRoutes) ส่งคำขอ contact ไป router
7. error middleware มีสี่ argument ตามรูปแบบ Express; log ข้อความฝั่ง server และคืน HTTP 500 แบบทั่วไป
8. app.listen เปิดรับ request และพิมพ์ URL

CORS ไม่ได้ทำหน้าที่ตรวจสอบตัวตน และ health ผ่านไม่ได้ยืนยันว่า SMTP ส่งเมลได้

### `backend/routes/contactRoutes.js`

สร้าง Router และ limitContact จาก express-rate-limit: จำกัด 5 requests ใน 15 นาทีต่อ key ผู้เรียกตามการตั้งค่าไลบรารี, ส่ง RateLimit headers แบบ draft-8 และปิด legacy headers

`router.post("/", limitContact, sendContact)` จับคู่ POST `/api/contact` เพราะ server เติม prefix มาแล้ว middleware จำกัดความถี่ทำก่อน controller แม้ข้อมูลที่ส่งจะไม่ผ่าน validation ก็นับเป็น request ส่วน router export default ให้ server import ไปใช้

### `backend/controllers/contactController.js`

named export sendContact เป็น async controller รับ req/res และมีลำดับดังนี้:

- อ่าน req.body ถ้าไม่มีใช้ object ว่าง แล้วเรียก validateContact; ข้อมูลไม่ผ่านคืน 400 และหยุดด้วย return
- createMailer อ่านการตั้งค่า ถ้ายังไม่ครบคืน 503 พร้อม code MAIL_NOT_CONFIGURED
- trim name/email/message ก่อนจัดข้อความ
- await mailer.sendMail ใน try: from ใช้ SMTP_USER, to ใช้ CONTACT_TO_EMAIL และ replyTo ใช้อีเมลที่กรอก
- subject มีชื่อผู้ติดต่อและเอา CR/LF ออก; text เป็นข้อความธรรมดา; html ใช้ escapeHtml กับค่าจากผู้ใช้ก่อนประกอบ
- ส่งผ่านคืน JSON ok=true ส่วนส่งล้มเหลว log และคืน 502

req คือคำขอจากผู้ชม ส่วน res ใช้ส่ง HTTP response กลับ การ return res... ช่วยไม่ให้โค้ดไหลไปส่ง response ซ้ำ และ await ทำให้รู้ว่าการส่งเมลสำเร็จก่อนแจ้งผู้ใช้

### `backend/config/mailer.js`

createMailer destructure SMTP_HOST/SMTP_USER/SMTP_PASS/CONTACT_TO_EMAIL จาก env ถ้าขาดค่าบังคับคืน null

เลือก port จาก SMTP_PORT หรือ 587 แล้ว nodemailer.createTransport ด้วย host/port/secure/auth secure=true เมื่อ SMTP_SECURE เป็นข้อความ `"true"` หรือ port=465 การสร้าง transport ยังไม่ได้ยืนยันการล็อกอิน SMTP จริง; การส่งจะเกิดใน sendMail

### `backend/utils/validateContact.js`

validateContact รับ object แล้วตรวจตามลำดับ: name ต้องเป็น string, trim แล้วยาวอย่างน้อย 2 และความยาวดิบไม่เกิน 90; email ต้องเป็น string ไม่เกิน 180 และผ่าน regex อีเมลพื้นฐาน; message ต้องเป็น string trim อย่างน้อย 10 และดิบไม่เกิน 3000

company ต้องไม่ส่งมาหรือเป็นสตริงว่าง ถ้าข้อใดไม่ผ่านคืน false ถ้าผ่านทั้งหมดคืน true frontend validation ช่วยผู้ใช้ ส่วน backend validation เป็นจุดที่ server บังคับจริง

escapeHtml แยกตาราง characters ให้อ่านง่าย จับ `& < > " '` ด้วย regex ที่มี g เพื่อแทนทุกตำแหน่ง แล้วใช้ callback คืน HTML entity จากตาราง ลดปัญหาข้อความที่ถูกตีความเป็น HTML ในอีเมล ไม่ได้ลบอักขระเหล่านี้ทิ้ง

## 12. CSS ทั้ง 11 ไฟล์

CSS ถูกเก็บแยกตามส่วนเหมือนเดิม การเปลี่ยนรูปแบบประกาศฟังก์ชันไม่จำเป็นต้องเปลี่ยน CSS คู่มือนี้อธิบายหน้าที่ของกฎแต่ละกลุ่ม; ค่าเช่นขนาด ระยะ สี และเวลาให้อ่านจาก selector ที่ต้องการปรับในไฟล์จริง

| ไฟล์ | กลุ่มกฎและหน้าที่ |
|---|---|
| base.css | import Google Fonts, ตัวแปร :root, reset/box-sizing, html/body, สี/link/form controls, focus, selection/scrollbar, site-shell, section-container/section-pad, typography, ปุ่ม, tag และ utility ที่ใช้หลายส่วน |
| layout.css | site-header/nav-frame, brand, desktop-nav, active link, ปุ่มภาษา/CTA/เมนูมือถือ, footer และแถบ marquee |
| hero.css | hero-section/content/copy, หัวเรื่องและปุ่ม, visual-scene และพื้น/วงโคจร/จุด, main-card และรูป portrait, floating-card/code/status, sticker/cross และแถบล่าง Hero |
| about.css | about-layout สองคอลัมน์, quote/decoration, คำบรรยาย, facts และตัวเลข stats |
| projects.css | work-intro/filter, grid/featured card, project details/tags, artwork commerce/solar/anime/meeting/food ทุกชนิด และ backdrop/dialog/content/columns |
| skills.css | layout หัวข้อกับกริดทักษะ, skill-card/heading/icon/tags/ลูกศร และ footnote |
| journey.css | journey-head/mark และ timeline-item/date/node รวมสถานะ active |
| contact.css | พื้นหลัง contact/glow/layout, อีเมล/GitHub, form-top/field/input/textarea, focus/submit และข้อความผลการส่ง |
| animations.css | @keyframes ที่ selector ในไฟล์อื่นเรียกใช้: pulse, float-main, float-side, rotate-orbit, rotate-star, marquee, sun-pulse, waveform |
| responsive.css | media queries ปรับความกว้าง/คอลัมน์/ขนาดตัวอักษร/เมนูมือถือ/กล่อง popup และ prefers-reduced-motion |
| project-screenshots.css | project-concept และ disclaimer, frame/img ของรูปจริง, ความสูงภาพเด่น, caption/ปุ่มเลขภาพ, repo note/ปุ่มลิงก์ และ media queries ของแกลเลอรี |

### อ่านกฎหนึ่งชุดอย่างไร

```css
.project-shot-frame > img {
  object-fit: cover;
  object-position: top center;
  width: 100%;
  height: 100%;
}
```

เลือก img ที่เป็นลูกโดยตรงของ frame; width/height ให้เต็มกรอบ; cover ขยายรูปให้คลุมกรอบจึงอาจตัดบางส่วน; top center จัดให้เห็นส่วนบนของ screenshot ก่อน ถ้าต้องการเห็นภาพเต็มโดยไม่ตัดต้องพิจารณา contain และพื้นที่ว่างในกรอบ

`.a .b` เลือกลูกหลาน ส่วน `.a > .b` เลือกลูกโดยตรง; `.a:hover` คือตอนเอาเมาส์ชี้; `.a::before/after` สร้างชิ้นตกแต่ง; `@media` ใช้กฎเฉพาะเงื่อนไขหน้าจอ

flex จัดองค์ประกอบในแนวหลัก, grid กำหนดคอลัมน์/แถว, gap เป็นช่องห่าง, padding คือระยะด้านใน, margin คือระยะด้านนอก position:absolute จัดตำแหน่งอิง ancestor ที่มี position ส่วน fixed อิง viewport, z-index จัดชั้นขององค์ประกอบภายใต้ stacking context

ตัวแปรสำคัญใน base.css: --bg/--surface คือพื้น, --white/--muted คือข้อความ, --blue คือสีหลัก, --stroke คือเส้น, --body/--display/--mono คือฟอนต์ และ --max จำกัดความกว้าง ใช้ผ่าน var(--ชื่อ)

แอนิเมชันหลัก: pulse เปลี่ยนความทึบ, float-main/side ทำให้การ์ดลอย, rotate-orbit/star หมุน, marquee เลื่อน track -50%, sun-pulse เปลี่ยนเงา และ waveform ย่อแท่งเสียง ค่า duration/delay/การวนซ้ำอยู่ใน selector ที่เรียก animation

responsive.css มีช่วง max-width หลายระดับ (เช่น 1020, 700, 410px) ไม่ได้มีแค่มือถือ/desktop สองขนาด ส่วน project-screenshots.css มี breakpoint ของภาพแยกอีกชุด และ reduced motion ลดระยะเวลา animation/transition

class ที่ยังอยู่ใน CSS ไม่จำเป็นต้องถูกใช้ใน JSX ปัจจุบันทุกตัว เช่นกฎที่เตรียมไว้สำหรับ effect รุ่นก่อน ไม่ได้หมายความว่ามี JavaScript ควบคุม effect นั้นแล้ว

## 13. ตั้งค่าและ dependencies

### `frontend/package.json` และ `package-lock.json`

scripts: dev เปิด Next dev port 3000; build สร้าง production build; start เปิด production หลัง build; capture:ecom/capture:project เรียกสคริปต์จับภาพเดียวกัน; screenshots:install ติดตั้ง Chromium ให้ Playwright

dependencies: next จัด routing/render/build, react/react-dom ทำ UI, motion ทำแอนิเมชัน, lucide-react ทำไอคอน ส่วน playwright เป็น devDependency ใช้จับภาพและตรวจเว็บ engines ระบุ Node >=20.9.0

package.json ระบุช่วง version เช่น ^16.0.0 ส่วน lockfile บันทึกรุ่นที่ resolve ได้และ integrity ของแพ็กเกจ ไม่ต้องแก้โค้ดใน lockfile ด้วยมือ npm install/ci เป็นผู้จัดการไฟล์นี้

### `frontend/next.config.mjs`

reactStrictMode เปิดการตรวจเพิ่มเติมของ React ใน development ส่วน async rewrites อ่าน API_URL หรือ localhost:4000 แล้วสร้างกฎ `/api/:path*` → `${api}/api/:path*` browser จึง fetch `/api/contact` จาก origin ของพอร์ตได้ โดย Next ส่งต่อไป backend

### `frontend/jsconfig.json`

baseUrl กำหนดฐานการ resolve และ paths จับคู่ @/* กับ ./src/* เป็นเหตุผลที่ import `@/components/...` ใช้ได้ ทั้งสองโปรเจกต์ใช้ JSX/JavaScript ไม่ต้องเปลี่ยนเป็น TypeScript เพื่อใช้ alias นี้

### `frontend/.env.example`

API_URL คือ URL backend ที่ Next ใช้ rewrite คัดลอกค่าไปไฟล์ env ที่เหมาะกับเครื่อง/hosting เมื่อตั้งค่าใหม่ให้ restart server ชื่อนี้ไม่มี NEXT_PUBLIC_ จึงไม่ได้ตั้งใจให้เป็นค่าที่ browser อ่านโดยตรง

### `backend/package.json` และ `package-lock.json`

type=module ทำให้ .js ใช้ import/export; dev เรียก node --watch server.js เพื่อ restart เมื่อแก้ไฟล์; start เรียก node server.js

dependencies: express รับ request, cors ตั้ง CORS headers, dotenv โหลด env, helmet ใส่ security headers, express-rate-limit จำกัดคำขอ และ nodemailer ส่ง SMTP lockfile มีหน้าที่เหมือนฝั่ง frontend

### `backend/.env.example` และ `.env` ของเครื่อง

| ตัวแปร | ใช้ตรงไหน |
|---|---|
| PORT | พอร์ต Express |
| FRONTEND_ORIGINS | origin ของเว็บที่ browser เรียก API ได้ หลายค่าคั่น comma |
| SMTP_HOST / SMTP_PORT | เซิร์ฟเวอร์/พอร์ตส่งเมล |
| SMTP_SECURE | การเชื่อมต่อ secure ตามเงื่อนไข createMailer |
| SMTP_USER / SMTP_PASS | บัญชีส่งเมล |
| CONTACT_TO_EMAIL | อีเมลผู้รับข้อความ |
| TRUST_PROXY | ระดับการเชื่อ reverse proxy ตามเงื่อนไข server.js |

คู่มือไม่แสดงค่ารหัสผ่านจาก `.env` จริง พอร์ตนี้ไม่มีการเชื่อมฐานข้อมูล ไม่มี Prisma และไม่มีระบบสมัครสมาชิกของผู้เข้าชม; การติดต่อจบที่ส่งอีเมล

## 14. สคริปต์จับภาพ `frontend/scripts/capture-project.mjs`

เป็น Node.js script ไม่ใช่ component ที่ Next render:

1. import chromium, path, fs/promises และ fileURLToPath; หา root จาก import.meta.url เพื่อไม่ขึ้นกับว่าเรียกจากโฟลเดอร์ไหน
2. กำหนด shotsDir, configPath และ allowedIds ของโปรเจกต์ทั้งห้า
3. ฟังก์ชัน arg อ่านค่าหลัง flag ใน process.argv; --id เริ่ม gaming-store ส่วน --url มี default เฉพาะร้าน Gaming Gear
4. ตรวจ id และ URL ต้องเป็น http/https; ข้อมูลผิดแจ้ง console และ exit(1)
5. สร้างโฟลเดอร์ภาพถ้ายังไม่มี แล้วเปิด Chromium แบบ headless
6. วนสองขนาด: desktop 1440×900 และ mobile 390×844; สร้าง context ใหม่แต่ละรอบพร้อม reducedMotion
7. goto รอ DOM, รอ body มีข้อความ, รอภาพ/ฟอนต์อีกเล็กน้อย และตรวจหน้า error/HTTP status
8. screenshot เฉพาะ viewport (fullPage=false) เป็น id-desktop.png/id-mobile.png พร้อมปิดแอนิเมชัน
9. อ่าน JSON แล้วตั้ง data[id]=paths จากนั้นเขียนรายการรูปกลับ ไฟล์นี้จะแทนรายการเดิมของ id นั้น จึงควรตรวจรายการที่ต้องการเก็บก่อนเรียก
10. catch แจ้งสาเหตุ/ตั้ง exitCode; finally ปิด browser แม้งานไม่สำเร็จ

ตัวอย่างหลังเปิดแอปจริงแล้ว:

```bash
cd frontend
npm run capture:project -- --id solar-chatbot --url http://127.0.0.1:5173
```

สคริปต์สร้าง browser context ใหม่และไม่ได้ทำขั้นตอน login หากหน้าแชตต้อง login มันจะจับหน้าเข้าสู่ระบบ ไม่ได้ใช้ session จาก browser ที่คุณเปิดอยู่ สำหรับภาพหลัง login ให้แคปด้วยตัวเองแล้วใส่ path ใน JSON

## 15. รูปภาพ ไฟล์เปิดโปรแกรม และเอกสาร

- `public/images/boss-portrait.webp` รูปที่ใช้ใน Hero; `boss-original.png` รูปต้นฉบับ ไม่ใช่ component
- `public/project-shots/` รูปผลงานจริง แยกโฟลเดอร์โปรเจกต์ได้; README.txt ชี้มาคู่มือนี้
- `public/favicon.svg` ภาพไอคอนเว็บแบบ vector ไม่ได้มี logic ธุรกิจ
- ไฟล์ใน public ถูกเสิร์ฟตาม path เช่น `/project-shots/gaming-store/products.png`
- `START_FRONTEND_WINDOWS.bat` ใช้ cd /d ไป frontend ใกล้ไฟล์ bat, ติดตั้งแพ็กเกจถ้ายังไม่มี node_modules, เรียก npm run dev แล้ว pause
- `START_BACKEND_WINDOWS.bat` ทำเหมือนกันกับ backend และคัดลอก .env.example เป็น .env เฉพาะเมื่อยังไม่มีไฟล์จริง
- `%~dp0` คือโฟลเดอร์ของ bat; call ทำให้กลับมาทำบรรทัดถัดไปหลัง npm; pause ค้างหน้าต่างไว้ให้เห็นข้อความ
- `.gitignore` กัน node_modules/.next/env/log/ไฟล์ระบบออกจากการเพิ่มเข้า Git ตาม pattern; ถ้าไฟล์เคยถูก track มาก่อน gitignore ไม่ได้ยกเลิกการ track ให้เอง
- `README_TH.md` วิธีติดตั้ง/รันและแผนที่ไฟล์; `GUIDE_FOR_BEGINNERS_TH.md` ลำดับเริ่มเรียน; ไฟล์นี้อธิบายแต่ละส่วนละเอียด

## 16. ตัวอย่างแก้ต่อโดยไม่หลงไฟล์

| สิ่งที่อยากแก้ | เริ่มที่ไหน | ตรวจอะไรต่อ |
|---|---|---|
| ข้อความแนะนำตัว/อีเมล | data/profile.js | ข้อความ hardcode ใน Hero/Footer/About |
| เพิ่มผลงาน | data/projects/ไฟล์ใหม่ + index.js | id ไม่ซ้ำ, category, visual, links, คำแปลครบ |
| ใช้ภาพจริง | public/project-shots + data/project-shots.json | URL เปิดได้ และ id ตรงกับ project |
| ข้อความปุ่มสองภาษา | data/languages/th.js + en.js | ใช้ key ตรงกัน |
| หน้าตาการ์ด | ProjectCard.jsx + projects.css | featured และมือถือ |
| popup/ปุ่มรูป | ProjectDialog.jsx / ProjectMedia.jsx | Escape/backdrop/สลับภาพ |
| สีหลัก/ฟอนต์ | styles/base.css | selector ที่อาจกำหนดสีทับไว้เอง |
| หน้าจอเล็ก | styles/responsive.css | กฎเฉพาะภาพใน project-screenshots.css |
| รับฟอร์ม/ส่งเมล | ContactForm → route → controller → mailer | validation และ SMTP ของเครื่อง |

ลำดับอ่านที่แนะนำ: page → PortfolioHome → Navbar → ProjectsSection → ProjectCard → ProjectMedia → ProjectDialog → ContactForm → backend/server → route → controller → utils/mailer จากนั้นค่อยอ่าน Hero/CSS เพื่อปรับงานออกแบบ
