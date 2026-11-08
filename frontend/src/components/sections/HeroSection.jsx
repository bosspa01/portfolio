"use client";

import { motion } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Github,
  Mail,
} from "lucide-react";
import { profile } from "@/data/profile";

// Hero = ส่วนแรกสุดของเว็บไซต์
// เปลี่ยนข้อความแนะนำตัวได้ที่ data/profile.js
// เปลี่ยนรูปได้ที่ public/images/boss-portrait.webp
const HeroSection = ({ lang, t }) => {
  return (
    <section id="home" className="hero-section section-container">
      <div className="hero-noise" />
      <div className="hero-lines" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="hero-content">
        {/* ฝั่งซ้าย: ข้อความและปุ่ม */}
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="hero-eyebrow">
            <span className="eyebrow-line" />
            <span className="live-dot" />
            {t.crafted}
          </p>

          <div className="hero-heading">
            <span className="hero-greeting">
              {t.hello} <span className="wave">✳</span>
            </span>
            <h1>
              BUILD.
              <br />
              CREATE.
              <br />
              <span>
                EVOLVE<span className="hero-period">.</span>
              </span>
            </h1>
          </div>

          <p className="hero-intro">
            <span className="blue-bullet">✦</span> {profile.intro[lang]}
          </p>

          <div className="hero-buttons">
            <a href="#work" className="btn btn-primary">
              {t.explore} <ArrowUpRight size={18} />
            </a>
            <a href="#contact" className="btn btn-outline">
              {t.contact} <ArrowRight size={18} />
            </a>
          </div>

          <div className="hero-social">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <Github size={18} /> GITHUB <ArrowUpRight size={12} />
            </a>
            <span className="hero-social-divider" />
            <a href={`mailto:${profile.email}`}>
              <Mail size={17} /> EMAIL <ArrowUpRight size={12} />
            </a>
          </div>
        </motion.div>

        {/* ฝั่งขวา: รูปโปรไฟล์ และกรอบที่ลอยเบา ๆ */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.88, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.2 }}
        >
          <div className="visual-scene">
            <div className="visual-floor" />
            <div className="orbit orbit-a" />
            <div className="orbit orbit-b" />
            <div className="orbit orbit-c" />
            <div className="orbit-point p1" />
            <div className="orbit-point p2" />
            <div className="orbit-point p3" />

            <div className="main-card">
              <div className="main-card-top">
                <span>
                  <i className="live-dot" /> SYSTEM ONLINE
                </span>
                <span>0001 — BOSS</span>
              </div>

              <div className="main-card-core">
                <span className="angle angle-tl" />
                <span className="angle angle-tr" />
                <span className="angle angle-bl" />
                <span className="angle angle-br" />
                <img
                  className="hero-portrait"
                  src="/images/boss-portrait.webp"
                  alt="Boss — Rapeephat Phaphan"
                />
                <div className="monogram-track portrait-caption">
                  FULL-STACK DEVELOPER • BOSS
                </div>
              </div>

              <div className="main-card-bottom">
                <span>RAPEEPHAT / PHAPHAN</span>
                <span>TH // 2026</span>
              </div>
            </div>

            <div className="floating-card float-code">
              <div className="float-title">
                <Code2 size={15} />
                <span>developer.jsx</span>
                <span className="float-dots">● ● ●</span>
              </div>
              <div className="float-source">
                <span>
                  <em>01</em>const <b>developer</b> = {"{"}
                </span>
                <span>
                  <em>02</em>&nbsp; name: <i>"Boss"</i>,
                </span>
                <span>
                  <em>03</em>&nbsp; passion: <i>"Building"</i>,
                </span>
                <span>
                  <em>04</em>&nbsp; status: <i>"Always learning"</i>
                </span>
                <span>
                  <em>05</em>
                  {"}"};
                </span>
              </div>
            </div>

            <div className="floating-card float-status">
              <span className="status-check">
                <Check size={14} />
              </span>
              <div>
                <b>CREATIVE MODE</b>
                <span>ON • ALWAYS BUILDING</span>
              </div>
              <span className="status-wave">⌁</span>
            </div>

            <div className="visual-sticker">
              FULL STACK
              <br />
              <span>DEVELOPER</span> <ArrowUpRight size={13} />
            </div>
            <span className="scene-cross cross-a">+</span>
            <span className="scene-cross cross-b">+</span>
            <span className="scene-cross cross-c">+</span>
          </div>
        </motion.div>
      </div>

      <div className="hero-bottom">
        <span className="availability">
          <span className="live-dot" />
          {t.status}
        </span>
        <span className="hero-index">01 / 05 &nbsp;—&nbsp; INDEX</span>
        <a href="#about" className="scroll-cue">
          {t.scroll}{" "}
          <span>
            <ArrowDown size={17} />
          </span>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
