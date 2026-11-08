"use client";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import ProjectMedia from "./ProjectMedia";
import { translations } from "@/data/languages";

const ProjectCard = ({ project, onOpen, lang }) => {
  const text = translations[lang];

  return (
    <article
      className={`project-card ${project.featured ? "project-featured" : ""}`}
    >
      <button
        type="button"
        className="project-art-button"
        onClick={onOpen}
        aria-label={`${text.viewCase}: ${project.title}`}
      >
        <ProjectMedia project={project} lang={lang} />
        <span className="art-open">
          <MoveUpRight size={19} />
        </span>
      </button>
      <div className="project-details">
        <div className="project-meta">
          <span>
            {project.number} / {project.type}
            {project.groupProject ? (lang === "th" ? " / งานกลุ่ม" : " / GROUP PROJECT") : ""}
          </span>
          <span className="project-line" />
        </div>
        <button onClick={onOpen} type="button" className="project-title-button">
          <h3>{project.title}</h3>
          <ArrowUpRight size={24} />
        </button>
        <p>{project.subtitle[lang]}</p>
        <div className="tag-row">
          {project.stack.slice(0, 4).map((tag) => {
            return (
              <span className="tag" key={tag}>
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
