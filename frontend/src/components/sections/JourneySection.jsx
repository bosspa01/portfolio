import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const JourneySection = ({ t }) => {
  return (
    <section className="journey-section section-container section-pad">
      <Reveal className="section-top">
        <p className="eyebrow">
          <span className="eyebrow-square" />
          {t.journeyKicker}
        </p>
        <span className="section-number">2023 — ∞</span>
      </Reveal>
      <div className="journey-head">
        <Reveal>
          <h2 className="display-title uppercase">
            {t.journeyHead}
            <br />
            <span className="outline-text">{t.journeyHead2}</span>
          </h2>
        </Reveal>
        <span className="journey-mark">✳</span>
      </div>
      <div className="timeline">
        <Reveal className="timeline-item">
          <span className="timeline-date">2023</span>
          <span className="timeline-node" />
          <div>
            <h3>{t.step1}</h3>
            <p>{t.step1desc}</p>
          </div>
          <ArrowUpRight size={22} />
        </Reveal>
        <Reveal className="timeline-item">
          <span className="timeline-date">2024 — 2026</span>
          <span className="timeline-node" />
          <div>
            <h3>{t.step2}</h3>
            <p>{t.step2desc}</p>
          </div>
          <ArrowUpRight size={22} />
        </Reveal>
        <Reveal className="timeline-item">
          <span className="timeline-date">{t.today} ↗</span>
          <span className="timeline-node active" />
          <div>
            <h3>{t.step3}</h3>
            <p>{t.step3desc}</p>
          </div>
          <ArrowUpRight size={22} />
        </Reveal>
      </div>
    </section>
  );
};

export default JourneySection;
