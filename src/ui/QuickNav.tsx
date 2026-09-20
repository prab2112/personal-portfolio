import { useState } from "react";
import { useGameStore } from "../store/useGameStore";
import { projects } from "../content/content";

export function QuickNav() {
  const [open, setOpen] = useState(false);
  const openModal = useGameStore((s) => s.openModal);
  const openZoneModal = useGameStore((s) => s.openZoneModal);
  const openProjectModal = useGameStore((s) => s.openProjectModal);

  if (openModal) return null;

  function go(fn: () => void) {
    fn();
    setOpen(false);
  }

  return (
    <div className="quicknav">
      <button
        className="quicknav-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open menu"
        aria-expanded={open}
      >
        {open ? "✕" : "☰"}
      </button>
      {open && (
        <nav className="quicknav-panel">
          <button className="quicknav-item" onClick={() => go(() => openZoneModal("about"))}>
            About
          </button>
          <div className="quicknav-group-label">Projects</div>
          {projects.map((p) => (
            <button key={p.id} className="quicknav-item quicknav-sub" onClick={() => go(() => openProjectModal(p.id))}>
              {p.title}
            </button>
          ))}
          <button className="quicknav-item" onClick={() => go(() => openZoneModal("contact"))}>
            Contact
          </button>
          <button className="quicknav-item" onClick={() => go(() => openZoneModal("resume"))}>
            Résumé
          </button>
        </nav>
      )}
    </div>
  );
}
