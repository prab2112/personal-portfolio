import { useGameStore } from "../store/useGameStore";

/** Opens whatever modal the player is currently in range of, or closes an open one. Shared by keyboard and touch input. */
export function triggerInteract() {
  const { phase, openModal, activeZone, activeProjectId, openZoneModal, openProjectModal, closeModal } =
    useGameStore.getState();

  if (phase !== "playing") return;

  if (openModal) {
    closeModal();
    return;
  }

  if (activeProjectId) {
    openProjectModal(activeProjectId);
  } else if (activeZone && activeZone !== "projects") {
    openZoneModal(activeZone);
  }
}
