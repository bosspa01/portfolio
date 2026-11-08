"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronDown, Globe2, Menu, X } from "lucide-react";

// Navbar: เมนูด้านบน และปุ่มเปลี่ยนภาษา
const Navbar = ({ lang, setLang, t }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const nav = ["home", "about", "work", "skills", "contact"];

  const hdlGoToSection = (id) => {
    setActiveSection(id);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="site-header">
        <div className="nav-frame">
          <a
            href="#home"
            className="brand"
            aria-label="Boss home"
            onClick={() => hdlGoToSection("home")}
          >
            <span className="brand-mark">
              B<span>.</span>
            </span>
            <span className="brand-info">
              BOSS®<small>PORTFOLIO / 2026</small>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            {nav.map((id, index) => {
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className={activeSection === id ? "nav-active" : ""}
                  onClick={() => hdlGoToSection(id)}
                >
                  {t.nav[index]}
                </a>
              );
            })}
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className="language-btn"
              aria-label="Change language"
              onClick={() => setLang(lang === "th" ? "en" : "th")}
            >
              <Globe2 size={15} /> {lang.toUpperCase()}{" "}
              <ChevronDown size={12} />
            </button>
            <a
              className="nav-cta"
              href="#contact"
              onClick={() => hdlGoToSection("contact")}
            >
              LET'S TALK <ArrowUpRight size={15} />
            </a>
            <button
              type="button"
              className="mobile-menu-btn"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          {nav.map((id, index) => {
            return (
              <a key={id} href={`#${id}`} onClick={() => hdlGoToSection(id)}>
                <small>0{index + 1}</small>
                {t.nav[index]}
                <ArrowUpRight size={20} />
              </a>
            );
          })}
        </nav>
      )}
    </>
  );
};

export default Navbar;
