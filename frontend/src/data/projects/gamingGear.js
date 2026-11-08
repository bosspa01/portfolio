// รายละเอียดโปรเจกต์ gamingGear แก้ไขที่ไฟล์นี้
export const gamingGear = {
  id: "gaming-store",
  number: "01",
  title: "Gaming Gear",
  type: "E-COMMERCE PLATFORM",
  category: "fullstack",
  visual: "commerce",
  featured: true,
  subtitle: {
    th: "ร้านอุปกรณ์เกมมิ่งที่มีเว็บขายสินค้าและ REST API",
    en: "A gaming gear storefront powered by a full-stack REST API.",
  },
  detail: {
    th: "แยก Frontend เป็น React + Vite และ Backend เป็น Express 5 พร้อมฐานข้อมูล PostgreSQL ผ่าน Prisma มีระบบล็อกอิน แยกสิทธิ์ user/admin/superadmin รายการสินค้า ค้นหา ตะกร้า ชำระเงินด้วย Stripe ระบบคูปอง ออเดอร์ และระบบแจ้งปัญหา (Tickets) ในฐานข้อมูล",
    en: "A React/Vite storefront backed by an Express 5 REST API and PostgreSQL via Prisma. Includes role-based authentication, product search, carts, Stripe checkout, coupons, orders, support tickets and administrative activity logs.",
  },
  features: {
    th: [
      "REST API แยกจากเว็บ React และจัดการข้อมูลด้วย Prisma",
      "ระบบ JWT และแยกสิทธิ์ผู้ใช้ / แอดมิน / Superadmin",
      "สินค้า ตะกร้า Checkout ชำระเงิน Stripe และคูปองส่วนลด",
      "ระบบสถานะออเดอร์ ขนส่ง แจ้งปัญหา และบันทึกกิจกรรมแอดมิน",
      "อัปโหลดรูปสินค้า Cloudinary และแดชบอร์ดจัดการร้านค้า",
    ],
    en: [
      "Separate React frontend and Express/Prisma backend",
      "JWT and user/admin/superadmin roles",
      "Product catalog, cart, Stripe checkout and coupons",
      "Order tracking, support tickets and admin audit logs",
      "Cloudinary image uploads and admin dashboard",
    ],
  },
  stack: [
    "React",
    "Vite",
    "Express 5",
    "Prisma",
    "PostgreSQL",
    "Stripe",
    "Cloudinary",
    "Zustand",
  ],
  links: [
    {
      label: "LIVE WEBSITE",
      url: "https://ecom-web-kohl-mu.vercel.app/",
      kind: "live",
    },
    {
      label: "FRONTEND REPO",
      url: "https://github.com/bosspa01/ecom-web",
      kind: "code",
    },
    {
      label: "BACKEND REPO",
      url: "https://github.com/bosspa01/ecom-api",
      kind: "code",
    },
  ],
  evidence: "GitHub routes, Prisma schema, package.json and Vercel link",
};
