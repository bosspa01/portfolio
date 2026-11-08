"use client";
import { useState } from "react";
import { ArrowUpRight, CheckCheck, Mail, Send } from "lucide-react";
import { profile } from "@/data/profile";
import { translations } from "@/data/languages";

const ContactForm = ({ lang }) => {
  const t = translations[lang];
  const [status, setStatus] = useState("idle");
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
    company: "",
  });
  const [responseText, setResponseText] = useState("");

  // Submit: หยุด reload หน้า → ส่งข้อมูลไป API → แสดงผลตอบกลับ
  const hdlSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("success");
        setResponseText(t.sent);
        setValues({ name: "", email: "", message: "", company: "" });
      } else if (data.code === "MAIL_NOT_CONFIGURED" || res.status === 503) {
        setStatus("unconfigured");
        setResponseText(t.apiUnavailable);
      } else {
        setStatus("error");
        setResponseText(data.message || t.error);
      }
    } catch {
      setStatus("unconfigured");
      setResponseText(t.apiUnavailable);
    }
  };

  return (
    <form className="contact-form" onSubmit={hdlSubmit}>
      <span className="form-top">
        <span>NEW MESSAGE</span>
        <span>↗ &nbsp; 001 / 001</span>
      </span>
      <div className="field">
        <label htmlFor="contact-name">01 / {t.formName}</label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          maxLength={90}
          placeholder={t.namePlaceholder}
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="contact-email">02 / {t.formEmail}</label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          required
          maxLength={180}
          placeholder={t.emailPlaceholder}
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="contact-message">03 / {t.formMessage}</label>
        <textarea
          id="contact-message"
          rows={4}
          required
          minLength={10}
          maxLength={3000}
          placeholder={t.messagePlaceholder}
          value={values.message}
          onChange={(e) => setValues({ ...values, message: e.target.value })}
        />
        <small>{t.messageHint}</small>
      </div>
      <div className="visually-hidden" aria-hidden="true">
        <label htmlFor="company-field">Leave this empty</label>
        <input
          id="company-field"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => setValues({ ...values, company: e.target.value })}
        />
      </div>
      <button
        className="btn btn-primary form-submit"
        type="submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? t.sending : t.send}
        <Send size={17} />
      </button>
      {status !== "idle" && status !== "loading" && (
        <p
          role="status"
          className={`form-message ${status === "success" ? "form-success" : ""}`}
        >
          {status === "success" ? <CheckCheck size={16} /> : <Mail size={16} />}
          {responseText}
        </p>
      )}
      <p className="form-alternative">
        {t.fallback}:{" "}
        <a href={`mailto:${profile.email}`}>
          {profile.email} <ArrowUpRight size={13} />
        </a>
      </p>
    </form>
  );
};

export default ContactForm;
