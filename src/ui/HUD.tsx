import { useGameStore } from "../store/useGameStore";
import { ZONES } from "../content/layout";
import { projects } from "../content/content";

export function HUD() {
  const activeZone = useGameStore((s) => s.activeZone);
  const activeProjectId = useGameStore((s) => s.activeProjectId);
  const openModal = useGameStore((s) => s.openModal);

  if (openModal) return null;

  let promptLabel: string | null = null;
  if (activeProjectId) {
    const project = projects.find((p) => p.id === activeProjectId);
    promptLabel = project ? project.title : null;
  } else if (activeZone && activeZone !== "projects") {
    promptLabel = ZONES[activeZone].label;
  }

  return (
    <>
      <div className="hud-corner">WASD / Arrows to move</div>
      <div className="hud-bottom">
        {promptLabel && (
          <div className="hud-prompt">
            <span className="key">E</span> view {promptLabel}
          </div>
        )}
      </div>
    </>
  );
}
