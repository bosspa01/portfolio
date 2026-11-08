// รายละเอียดโปรเจกต์ foodApp แก้ไขที่ไฟล์นี้
export const foodApp = {
  id: "food-app",
  number: "05",
  title: "Food Delivery App",
  type: "MULTI-ROLE FOOD DELIVERY",
  category: "fullstack",
  visual: "food",
  subtitle: {
    th: "ระบบสั่งอาหาร 4 บทบาท พร้อมสั่งเป็นกลุ่ม",
    en: "A four-role food ordering platform with group carts.",
  },
  detail: {
    th: "เว็บแอป ASP.NET Core MVC (.NET 10) ที่ครอบคลุมลูกค้า ร้านอาหาร ไรเดอร์ และแอดมิน ฝั่งลูกค้าค้นหาร้าน/เมนู สั่งอาหารแบบรายบุคคลหรือแชร์รหัสกลุ่ม ชำระเงินสดหรือ Stripe และติดตามออเดอร์ ร้านค้าแก้เมนูและสถานะอาหาร ไรเดอร์รับงาน ส่วนแอดมินอนุมัติร้านและจัดการคูปอง",
    en: "An ASP.NET Core MVC (.NET 10) food delivery app for customers, stores, riders and administrators. Customers can search menus, place individual or group orders, use coupons and pay via Stripe. Stores manage menus, riders claim deliveries, and admins approve accounts and manage the platform.",
  },
  features: {
    th: [
      "4 บทบาท: ลูกค้า ร้านค้า ไรเดอร์ และผู้ดูแลระบบ",
      "สั่งอาหารร่วมกันด้วยรหัสกลุ่ม และระบบรีวิว",
      "รับชำระเงินสดหรือ Stripe Checkout พร้อมคูปอง",
      "ขั้นตอน WAITING → READY → รับงานจัดส่ง → ส่งสำเร็จ",
      "อนุมัติร้าน/ไรเดอร์ และจัดการผู้ใช้ผ่านแอดมิน",
    ],
    en: [
      "Four roles: customer, store, rider and admin",
      "Shared group ordering codes and reviews",
      "Cash and Stripe Checkout with coupons",
      "Order lifecycle from preparation to delivery",
      "Admin approval and user management",
    ],
  },
  stack: [
    "C#",
    ".NET 10",
    "ASP.NET Core MVC",
    "EF Core",
    "MySQL",
    "Stripe",
    "BCrypt",
  ],
  links: [
    {
      label: "SOURCE CODE",
      url: "https://github.com/bosspa01/FoodApp",
      kind: "code",
    },
  ],
  evidence: "Repository README, Controllers and Views",
};
