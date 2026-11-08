"use client";
import { useEffect, useState } from "react";
import ProjectArtwork from "./ProjectArtwork";
import screenshots from "@/data/project-shots.json";
import { translations } from "@/data/languages";

const ProjectMedia = ({ project, lang, large = false }) => {
  const images = screenshots[project.id] || [];
  const [active, setActive] = useState(0);

  // เปลี่ยนโปรเจกต์แล้วให้กลับไปดูรูปแรก
  useEffect(() => {
    setActive(0);
  }, [project.id]);

  // ถ้ายังไม่มีรูปจริง ใช้ภาพประกอบเดิมพร้อมข้อความกำกับใน popup
  if (!images.length) {
    return (
      <div className="project-concept">
        <ProjectArtwork variant={project.visual} />
        {large && (
          <span className="project-media-disclaimer">
            {translations[lang].visualNote}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`project-shot-frame ${large ? "project-shot-large" : ""}`}>
      <img
        src={images[Math.min(active, images.length - 1)]}
        alt={`${project.title} — ${translations[lang].screenshotNote} ${active + 1}`}
        loading="lazy"
      />
      {large && images.length > 1 && (
        <div
          className="project-shot-controls"
          aria-label={translations[lang].screenshotNote}
        >
          {images.map((url, index) => {
            return (
              <button
                type="button"
                key={url}
                className={active === index ? "active" : ""}
                onClick={() => setActive(index)}
                aria-label={`Screenshot ${index + 1}`}
              >
                {String(index + 1).padStart(2, "0")}
              </button>
            );
          })}
        </div>
      )}
      {large && (
        <span className="project-shot-caption">
          {translations[lang].screenshotNote}
        </span>
      )}
    </div>
  );
};

export default ProjectMedia;
