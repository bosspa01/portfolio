// ตรวจข้อมูลเบื้องต้นก่อนส่งอีเมล
export const validateContact = ({ name, email, message, company }) => {
  if (typeof name !== "string" || name.trim().length < 2 || name.length > 90) {
    return false;
  }
  if (
    typeof email !== "string" ||
    email.length > 180 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return false;
  }
  if (
    typeof message !== "string" ||
    message.trim().length < 10 ||
    message.length > 3000
  ) {
    return false;
  }
  // ช่องดักบอท: ผู้ใช้จริงต้องปล่อย company ว่างไว้
  if (company !== undefined && company !== "") {
    return false;
  }
  return true;
};

// แปลงอักขระพิเศษก่อนนำข้อความผู้ใช้ไปแสดงใน HTML อีเมล
export const escapeHtml = (text) => {
  const characters = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return text.replace(/[&<>"']/g, (char) => {
    return characters[char];
  });
};
