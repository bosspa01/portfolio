"use client";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Github, Globe2, X } from "lucide-react";
import ProjectMedia from "./ProjectMedia";
import { translations } from "@/data/languages";

const ProjectDialog = ({ project, lang, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [project, onClose]);
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="dialog-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.section
            className="dialog"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.28 }}
          >
            <button
              className="dialog-close"
              type="button"
              onClick={onClose}
              aria-label={translations[lang].close}
            >
              <X size={19} />
            </button>
            <ProjectMedia project={project} lang={lang} large />
            <div className="dialog-content">
              <p className="eyebrow">
                {project.number} / {project.type}
              </p>
              <h2>
                {project.title}
                <span className="blue-dot">.</span>
              </h2>
              <p className="dialog-lead">{project.detail[lang]}</p>
              <div className="dialog-cols">
                <div>
                  <h4>{lang === "th" ? "ฟีเจอร์เด่น" : "KEY FEATURES"}</h4>
                  <ul>
                    {project.features[lang].map((f) => {
                      return (
                        <li key={f}>
                          <Check size={15} /> {f}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <h4>TECH STACK</h4>
                  <div className="tag-row">
                    {project.stack.map((x) => {
                      return (
                        <span className="tag" key={x}>
                          {x}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="project-repo-info">
                <span>{translations[lang].sourceNote}</span>
                {project.groupProject && (
                  <p>
                    <strong>{translations[lang].groupProject}</strong> · {translations[lang].groupNote}{" "}
                    <a
                      href={project.upstream}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {translations[lang].teamRepository} ↗
                    </a>
                  </p>
                )}
              </div>
              <div className="project-links">
                {(project.links || []).map((item, index) => {
                  return (
                    <a
                      key={item.url}
                      className={`btn ${index === 0 ? "btn-primary" : "btn-outline"} dialog-link`}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.kind === "code" ? (
                        <Github size={17} />
                      ) : (
                        <Globe2 size={17} />
                      )}{" "}
                      {item.label}
                      <ArrowUpRight size={17} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDialog;
