import { create } from "zustand";

export type ZoneId = "about" | "projects" | "contact" | "resume" | null;

interface GameState {
  phase: "loading" | "start" | "playing";
  setPhase: (phase: GameState["phase"]) => void;

  activeZone: ZoneId;
  setActiveZone: (zone: ZoneId) => void;

  openModal: ZoneId | "project";
  activeProjectId: string | null;
  openZoneModal: (zone: Exclude<ZoneId, null>) => void;
  openProjectModal: (id: string) => void;
  closeModal: () => void;

  isTouch: boolean;
  setIsTouch: (v: boolean) => void;
}

export const useGameStore = create<GameState>((set) => ({
  phase: "loading",
  setPhase: (phase) => set({ phase }),

  activeZone: null,
  setActiveZone: (zone) => set({ activeZone: zone }),

  openModal: null,
  activeProjectId: null,
  openZoneModal: (zone) => set({ openModal: zone, activeProjectId: null }),
  openProjectModal: (id) => set({ openModal: "project", activeProjectId: id }),
  closeModal: () => set({ openModal: null, activeProjectId: null }),

  isTouch: false,
  setIsTouch: (v) => set({ isTouch: v }),
}));
