import { useEffect } from "react";
import { useGameStore } from "../store/useGameStore";
import { triggerInteract } from "./interact";

const INTERACT_KEYS = new Set(["KeyE", "Space", "Enter"]);

/** Global keyboard listener that opens/closes modals based on player proximity. Lives outside the Canvas. */
export function InteractHandler() {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.code === "Escape") {
        useGameStore.getState().closeModal();
        return;
      }

      if (!INTERACT_KEYS.has(e.code) || e.repeat) return;

      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;

      triggerInteract();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return null;
}
