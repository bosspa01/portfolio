import "../styles/base.css";
import "../styles/layout.css";
import "../styles/hero.css";
import "../styles/about.css";
import "../styles/projects.css";
import "../styles/skills.css";
import "../styles/journey.css";
import "../styles/contact.css";
import "../styles/animations.css";
import "../styles/responsive.css";
import "../styles/project-screenshots.css";

export const metadata = {
  title: "Boss — Rapeephat Phaphan | Full-stack Developer",
  description:
    "Portfolio of Boss — web development, full-stack projects, and AI.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
