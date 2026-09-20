import { RigidBody } from "@react-three/rapier";
import { ISLAND_RADIUS, DECORATIONS, PATHS, PATH_WIDTH } from "../content/layout";

function Tree({ position, scale }: { position: [number, number, number]; scale: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.12, 0.16, 1.2, 6]} />
        <meshStandardMaterial color="#8a5a3c" flatShading />
      </mesh>
      <mesh castShadow position={[0, 1.7, 0]}>
        <coneGeometry args={[0.9, 1.8, 7]} />
        <meshStandardMaterial color="#3f8f5c" flatShading />
      </mesh>
      <mesh castShadow position={[0, 2.5, 0]}>
        <coneGeometry args={[0.65, 1.3, 7]} />
        <meshStandardMaterial color="#4caf6e" flatShading />
      </mesh>
    </group>
  );
}

function Rock({ position, scale }: { position: [number, number, number]; scale: number }) {
  return (
    <mesh castShadow position={[position[0], 0.3 * scale, position[2]]} scale={scale} rotation={[0.3, 0.5, 0.1]}>
      <icosahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color="#9a9a93" flatShading />
    </mesh>
  );
}

function PathStrip({ from, to }: { from: [number, number]; to: [number, number] }) {
  const dx = to[0] - from[0];
  const dz = to[1] - from[1];
  const length = Math.hypot(dx, dz);
  const angle = Math.atan2(dx, dz);
  const midX = (from[0] + to[0]) / 2;
  const midZ = (from[1] + to[1]) / 2;
  return (
    <mesh receiveShadow position={[midX, -0.44, midZ]} rotation={[0, angle, 0]}>
      <boxGeometry args={[PATH_WIDTH, 0.04, length]} />
      <meshStandardMaterial color="#ead9a0" flatShading />
    </mesh>
  );
}

export function World() {
  return (
    <>
      {/* island ground, physics + visual */}
      <RigidBody type="fixed" colliders="cuboid" friction={1}>
        <mesh receiveShadow position={[0, -0.5, 0]}>
          <cylinderGeometry args={[ISLAND_RADIUS, ISLAND_RADIUS + 4, 1, 48]} />
          <meshStandardMaterial color="#7bc47f" flatShading />
        </mesh>
      </RigidBody>

      {/* cliff/underside for a bit of visual depth */}
      <mesh position={[0, -3, 0]}>
        <cylinderGeometry args={[ISLAND_RADIUS + 3.5, ISLAND_RADIUS - 6, 5, 48]} />
        <meshStandardMaterial color="#8a6a4e" flatShading />
      </mesh>

      {PATHS.map((p, i) => (
        <PathStrip key={i} from={p.from} to={p.to} />
      ))}

      {DECORATIONS.map((d, i) =>
        d.kind === "tree" ? (
          <Tree key={i} position={d.position} scale={d.scale} />
        ) : (
          <Rock key={i} position={d.position} scale={d.scale} />
        )
      )}
    </>
  );
}
