import { useGameStore } from "../store/useGameStore";
import { profile, projects, socials, resumeUrl } from "../content/content";

function AboutContent() {
  return (
    <>
      <p className="modal-kicker">About</p>
      <h2>{profile.role}</h2>
      <p>{profile.bio}</p>
      <p style={{ marginTop: 12, fontSize: "0.85rem", color: "#8a8a8a" }}>{profile.location}</p>
    </>
  );
}

function ContactContent() {
  return (
    <>
      <p className="modal-kicker">Contact</p>
      <h2>Let's talk</h2>
      <p>Reach out through any of these:</p>
      <div className="social-list">
        {socials.map((s) => (
          <a key={s.label} className="social-row" href={s.href} target="_blank" rel="noreferrer">
            <span className="social-label">{s.label}</span>
            <span className="social-value">{s.value}</span>
          </a>
        ))}
      </div>
    </>
  );
}

function ResumeContent() {
  return (
    <>
      <p className="modal-kicker">Résumé</p>
      <h2>Take a look</h2>
      <p>View or download a copy of my résumé.</p>
      <div className="link-row">
        <a className="link-button" href={resumeUrl} target="_blank" rel="noreferrer">
          View résumé
        </a>
        <a className="link-button secondary" href={resumeUrl} download>
          Download PDF
        </a>
      </div>
    </>
  );
}

function ProjectContent({ id }: { id: string }) {
  const index = projects.findIndex((p) => p.id === id);
  const project = projects[index];
  const openProjectModal = useGameStore((s) => s.openProjectModal);
  if (!project) return null;

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <p className="modal-kicker">Project</p>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <div className="tag-row">
        {project.tags.map((t) => (
          <span className="tag" key={t}>
            {t}
          </span>
        ))}
      </div>
      <div className="link-row">
        {project.link && (
          <a className="link-button" href={project.link} target="_blank" rel="noreferrer">
            Live site
          </a>
        )}
        {project.repo && (
          <a className="link-button secondary" href={project.repo} target="_blank" rel="noreferrer">
            Source
          </a>
        )}
      </div>
      {projects.length > 1 && (
        <div className="project-nav">
          <button onClick={() => openProjectModal(prev.id)}>&larr; {prev.title}</button>
          <button onClick={() => openProjectModal(next.id)}>{next.title} &rarr;</button>
        </div>
      )}
    </>
  );
}

export function Modal() {
  const openModal = useGameStore((s) => s.openModal);
  const activeProjectId = useGameStore((s) => s.activeProjectId);
  const closeModal = useGameStore((s) => s.closeModal);

  if (!openModal) return null;

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal} aria-label="Close">
          ✕
        </button>
        {openModal === "about" && <AboutContent />}
        {openModal === "contact" && <ContactContent />}
        {openModal === "resume" && <ResumeContent />}
        {openModal === "project" && activeProjectId && <ProjectContent id={activeProjectId} />}
      </div>
    </div>
  );
}
