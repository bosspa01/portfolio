import { ArrowUpRight, Code2, Database, Layers3, Sparkles } from "lucide-react";
import { skills } from "@/data/skills";
import Reveal from "@/components/ui/Reveal";

const skillIcons = {
  layout: Layers3,
  server: Code2,
  database: Database,
  sparkles: Sparkles,
};

// ส่วนทักษะ: ข้อมูลแบ่งหมวดอยู่ใน data/skills.js
const SkillsSection = ({ t }) => {
  return (
    <section id="skills" className="skills-section section-pad">
      <div className="section-container">
        <Reveal className="section-top">
          <p className="eyebrow">
            <span className="eyebrow-square" />
            {t.skillsKicker}
          </p>
          <span className="section-number">[ 03 — 04 ]</span>
        </Reveal>

        <div className="skills-layout">
          <div className="skills-head">
            <Reveal>
              <h2 className="display-title uppercase">
                {t.skillsHead}
                <br />
                <span className="outline-text">{t.skillsHead2}</span>
              </h2>
              <p className="skills-description">{t.skillsDesc}</p>
              <div className="skills-compass">
                ✳<span>EXPLORE • EXPERIMENT • EVOLVE</span>
              </div>
            </Reveal>
          </div>

          <div className="skill-grid">
            {skills.map((group, index) => {
              const Icon = skillIcons[group.icon];
              return (
                <Reveal
                  className="skill-card"
                  key={group.name}
                  delay={index * 0.06}
                >
                  <div className="skill-card-heading">
                    <span className="skill-icon">
                      <Icon size={22} />
                    </span>
                    <span>0{index + 1} / 04</span>
                  </div>
                  <h3>{group.name}</h3>
                  <div className="skill-tags">
                    {group.items.map((skill) => {
                      return (
                        <span key={skill}>{skill}</span>
                      );
                    })}
                  </div>
                  <ArrowUpRight className="skill-card-arrow" size={21} />
                </Reveal>
              );
            })}
          </div>
        </div>
        <p className="skills-footnote">{t.nextNote}</p>
      </div>
    </section>
  );
};

export default SkillsSection;
