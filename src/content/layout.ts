import { projects } from "./content";

// World-space layout for the island. Change these to rearrange zones —
// nothing else needs to know about world geometry.

export const SPAWN_POSITION: [number, number, number] = [0, 1.5, 14];

export const ISLAND_RADIUS = 42;

export const ZONES = {
  resume: {
    id: "resume" as const,
    label: "Résumé",
    position: [0, 0, 5] as [number, number, number],
    radius: 3.2,
    color: "#f4c95d",
  },
  about: {
    id: "about" as const,
    label: "About",
    position: [-16, 0, -4] as [number, number, number],
    radius: 4,
    color: "#6ec6ff",
  },
  contact: {
    id: "contact" as const,
    label: "Contact",
    position: [16, 0, -4] as [number, number, number],
    radius: 4,
    color: "#8be28b",
  },
  projects: {
    id: "projects" as const,
    label: "Projects",
    position: [0, 0, -20] as [number, number, number],
    radius: 14,
    color: "#f28b82",
  },
};

// One pedestal per project, arranged in an arc inside the "projects" zone.
export const PROJECT_PEDESTALS = projects.map((project, i) => {
  const count = projects.length;
  const spread = Math.min(count - 1, 4) * 6; // total arc width
  const start = -spread / 2;
  const x = count === 1 ? 0 : start + (spread / (count - 1)) * i;
  return {
    project,
    position: [x, 0, -24] as [number, number, number],
  };
});

// Simple deterministic scatter for decorative trees/rocks so the world
// doesn't feel like an empty plane, kept out of the walkable/zone areas.
function seededRandom(seed: number) {
  let t = seed;
  return () => {
    t = (t * 1103515245 + 12345) & 0x7fffffff;
    return t / 0x7fffffff;
  };
}

function isInsideAnyZone(x: number, z: number) {
  return Object.values(ZONES).some((zone) => {
    const [zx, , zz] = zone.position;
    const dx = x - zx;
    const dz = z - zz;
    return Math.sqrt(dx * dx + dz * dz) < zone.radius + 3;
  });
}

export const DECORATIONS = (() => {
  const rand = seededRandom(42);
  const items: { position: [number, number, number]; scale: number; kind: "tree" | "rock" }[] = [];
  let attempts = 0;
  while (items.length < 45 && attempts < 500) {
    attempts++;
    const angle = rand() * Math.PI * 2;
    const dist = 6 + rand() * (ISLAND_RADIUS - 8);
    const x = Math.cos(angle) * dist;
    const z = Math.sin(angle) * dist;
    if (isInsideAnyZone(x, z)) continue;
    items.push({
      position: [x, 0, z],
      scale: 0.7 + rand() * 0.9,
      kind: rand() > 0.4 ? "tree" : "rock",
    });
  }
  return items;
})();
