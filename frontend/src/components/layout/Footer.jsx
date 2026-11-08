import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";

const Footer = ({ t }) => {
  return (
    <footer className="footer">
      <div className="section-container footer-inner">
        <a className="footer-logo" href="#home">
          B<span>.</span>
        </a>
        <p>
          © 2026 Rapeephat Phaphan.
          <br />
          <span>{t.footer}</span>
        </p>
        <div className="footer-links">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GITHUB <ArrowUpRight size={14} />
          </a>
          <a href={`mailto:${profile.email}`}>
            EMAIL <ArrowUpRight size={14} />
          </a>
          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
