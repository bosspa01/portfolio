import Reveal from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

// ส่วนแนะนำตัว: เปลี่ยนข้อมูลจริงใน data/profile.js
const AboutSection = ({ lang, t }) => {
  return (
    <section id="about" className="about-section section-container section-pad">
      <Reveal className="section-top">
        <p className="eyebrow">
          <span className="eyebrow-square" />
          {t.aboutKicker}
        </p>
        <span className="section-number">[ 01 — 04 ]</span>
      </Reveal>

      <div className="about-layout">
        <Reveal className="about-left">
          <h2 className="display-title">
            {t.aboutHead}
            <br />
            <span className="outline-text">{t.aboutHead2}</span>
          </h2>
          <p className="about-quote">“{t.aboutText}”</p>
          <div className="about-decoration">
            ✳ <span>MAKE IT WORK. MAKE IT MATTER.</span>
          </div>
        </Reveal>

        <Reveal className="about-right" delay={0.12}>
          <p className="about-large-copy">{profile.about[lang]}</p>
          <div className="about-facts">
            <div>
              <span>01 / {t.education}</span>
              <b>{profile.university}</b>
              <small>{profile.major}</small>
            </div>
            <div>
              <span>02 / {t.focus}</span>
              <b>{t.focusValue}</b>
              <small>{profile.location[lang]}</small>
            </div>
          </div>
          <div className="about-stats">
            <div>
              <strong>
                05<span>+</span>
              </strong>
              <p>PROJECTS BUILT</p>
            </div>
            <div>
              <strong>
                3.60<span>/4</span>
              </strong>
              <p>UNIVERSITY GPA</p>
            </div>
            <div>
              <strong>
                2023<span>→</span>
              </strong>
              <p>CODING JOURNEY</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default AboutSection;
