"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Github } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import { profile } from "@/data/profile";

const ContactSection = ({ lang, t }) => {
  const [copied, setCopied] = useState(false);

  // กดเพื่อคัดลอกอีเมล
  const hdlCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="contact-section section-pad">
      <div className="contact-glow" />
      <div className="section-container">
        <Reveal className="section-top">
          <p className="eyebrow">
            <span className="eyebrow-square" />
            {t.contactKicker}
          </p>
          <span className="section-number">[ 04 — 04 ]</span>
        </Reveal>

        <div className="contact-layout">
          <Reveal className="contact-left">
            <h2 className="display-title uppercase">
              {t.contactHead}
              <br />
              <span className="outline-text">{t.contactHead2}</span>
            </h2>
            <p>{t.contactDesc}</p>

            <div className="contact-email">
              <span>DROP ME A LINE</span>
              <button type="button" onClick={hdlCopyEmail} title="Copy email">
                {profile.email}
                {copied ? <Check size={22} /> : <Copy size={20} />}
              </button>
              {copied && <small role="status">{t.copied}</small>}
            </div>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-github"
            >
              <Github size={19} /> GITHUB / @bosspa01 <ArrowUpRight size={17} />
            </a>
          </Reveal>

          <Reveal className="contact-form-area" delay={0.08}>
            <ContactForm lang={lang} />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
