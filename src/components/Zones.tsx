import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { ZONES, PROJECT_PEDESTALS } from "../content/layout";
import { playerPosition } from "../state/playerPosition";
import { useGameStore, type ZoneId } from "../store/useGameStore";

const PEDESTAL_RADIUS = 2.2;

function ZonePad({ position, radius, color, label }: { position: [number, number, number]; radius: number; color: string; label: string }) {
  return (
    <group position={position}>
      <mesh receiveShadow position={[0, -0.44, 0]}>
        <cylinderGeometry args={[radius, radius, 0.12, 32]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
      <Text
        position={[0, 3.2, 0]}
        fontSize={0.9}
        color="#1c1c1c"
        outlineWidth={0.04}
        outlineColor="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function ProjectPedestal({ position, title }: { position: [number, number, number]; title: string }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <cylinderGeometry args={[1, 1.15, 1, 8]} />
        <meshStandardMaterial color="#3d3d5c" flatShading />
      </mesh>
      <mesh castShadow position={[0, 1.35, 0]} rotation={[0, Math.PI / 8, 0]}>
        <boxGeometry args={[0.9, 0.7, 0.15]} />
        <meshStandardMaterial color="#f4a259" flatShading />
      </mesh>
      <Text
        position={[0, 2.2, 0]}
        fontSize={0.5}
        maxWidth={3}
        textAlign="center"
        color="#1c1c1c"
        outlineWidth={0.03}
        outlineColor="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>
    </group>
  );
}

export function Zones() {
  return (
    <>
      <ZonePad {...ZONES.resume} />
      <ZonePad {...ZONES.about} />
      <ZonePad {...ZONES.contact} />
      <ZonePad {...ZONES.projects} />
      {PROJECT_PEDESTALS.map(({ project, position }) => (
        <ProjectPedestal key={project.id} position={position} title={project.title} />
      ))}
    </>
  );
}

/** Watches player position each frame and updates zone/project proximity in the store, without spamming re-renders. */
export function ProximityWatcher() {
  const lastZone = useRef<ZoneId>(null);
  const lastProject = useRef<string | null>(null);
  const setActiveZone = useGameStore((s) => s.setActiveZone);

  useFrame(() => {
    let nearestZone: ZoneId = null;
    for (const zone of Object.values(ZONES)) {
      const dx = playerPosition.x - zone.position[0];
      const dz = playerPosition.z - zone.position[2];
      if (Math.sqrt(dx * dx + dz * dz) < zone.radius) {
        nearestZone = zone.id;
        break;
      }
    }
    if (nearestZone !== lastZone.current) {
      lastZone.current = nearestZone;
      setActiveZone(nearestZone);
    }

    let nearestProject: string | null = null;
    for (const { project, position } of PROJECT_PEDESTALS) {
      const dx = playerPosition.x - position[0];
      const dz = playerPosition.z - position[2];
      if (Math.sqrt(dx * dx + dz * dz) < PEDESTAL_RADIUS) {
        nearestProject = project.id;
        break;
      }
    }
    if (nearestProject !== lastProject.current) {
      lastProject.current = nearestProject;
      useGameStore.setState({ activeProjectId: nearestProject });
    }
  });

  return null;
}
