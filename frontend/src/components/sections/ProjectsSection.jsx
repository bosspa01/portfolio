"use client";

import { useState } from "react";
import { ArrowDownRight } from "lucide-react";
import { projects } from "@/data/projects";
import Reveal from "@/components/ui/Reveal";
import ProjectCard from "@/components/projects/ProjectCard";

// ส่วนแสดงผลงาน: ดึงข้อมูลจาก data/projects/ แล้ววนแสดงการ์ด
const ProjectsSection = ({ lang, t, onOpenProject }) => {
  const [filter, setFilter] = useState("all");

  // กรองหมวดหมู่ด้วย JavaScript พื้นฐาน
  const visibleProjects = projects.filter((project) => {
    if (filter === "all") {
      return true;
    }
    if (filter === "ai") {
      return project.category === "ai" || project.category === "bot";
    }
    return project.category === "fullstack";
  });

  const categories = [
    { id: "all", label: t.all },
    { id: "fullstack", label: t.fullstack },
    { id: "ai", label: t.ai },
  ];

  return (
    <section id="work" className="work-section section-container section-pad">
      <Reveal className="section-top">
        <p className="eyebrow">
          <span className="eyebrow-square" />
          {t.introWork}
        </p>
        <span className="section-number">[ 02 — 04 ]</span>
      </Reveal>

      <Reveal className="work-intro">
        <div>
          <h2 className="display-title uppercase">
            {t.workHeading}
            <br />
            <span className="outline-text">{t.workHeading2}</span>
          </h2>
          <p className="section-subtitle">{t.selected}</p>
        </div>

        <div className="filter-group" role="group" aria-label="Filter projects">
          {categories.map((item) => {
            return (
              <button
                key={item.id}
                type="button"
                className={`filter-btn ${filter === item.id ? "selected" : ""}`}
                onClick={() => setFilter(item.id)}
              >
                {item.label} {filter === item.id && <span>↗</span>}
              </button>
            );
          })}
        </div>
      </Reveal>

      <div className="project-grid">
        {visibleProjects.map((project) => {
          return (
            <div
              key={project.id}
              className={`project-grid-item ${project.featured ? "wide" : ""}`}
            >
              <ProjectCard
                project={project}
                lang={lang}
                onOpen={() => onOpenProject(project)}
              />
            </div>
          );
        })}
      </div>

      <Reveal className="projects-endline">
        <span>END OF SELECTED WORK</span>
        <span>
          MORE TO COME <ArrowDownRight size={20} />
        </span>
      </Reveal>
    </section>
  );
};

export default ProjectsSection;
