import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, CapsuleCollider, type RapierRigidBody } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { Controls } from "../controls";
import { touchMoveVector } from "../input/touchInput";
import { playerPosition } from "../state/playerPosition";
import { SPAWN_POSITION } from "../content/layout";

const SPEED = 7;
const TURN_LERP = 12;

export function Player() {
  const bodyRef = useRef<RapierRigidBody>(null);
  const visualRef = useRef<THREE.Group>(null);
  const facing = useRef(0);

  const forward = useKeyboardControls((s) => s[Controls.forward]);
  const back = useKeyboardControls((s) => s[Controls.back]);
  const left = useKeyboardControls((s) => s[Controls.left]);
  const right = useKeyboardControls((s) => s[Controls.right]);

  useFrame((_, delta) => {
    const body = bodyRef.current;
    if (!body) return;

    let x = (right ? 1 : 0) - (left ? 1 : 0) + touchMoveVector.x;
    let z = (back ? 1 : 0) - (forward ? 1 : 0) + touchMoveVector.z;

    const len = Math.hypot(x, z);
    if (len > 1) {
      x /= len;
      z /= len;
    }

    const vel = body.linvel();
    body.setLinvel({ x: x * SPEED, y: vel.y, z: z * SPEED }, true);

    const t = body.translation();

    if (t.y < -12) {
      body.setTranslation({ x: SPAWN_POSITION[0], y: SPAWN_POSITION[1], z: SPAWN_POSITION[2] }, true);
      body.setLinvel({ x: 0, y: 0, z: 0 }, true);
      playerPosition.set(SPAWN_POSITION[0], SPAWN_POSITION[1], SPAWN_POSITION[2]);
      return;
    }

    playerPosition.set(t.x, t.y, t.z);

    if (len > 0.05 && visualRef.current) {
      const targetAngle = Math.atan2(x, z);
      let diff = targetAngle - facing.current;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      facing.current += diff * Math.min(1, TURN_LERP * delta);
      visualRef.current.rotation.y = facing.current;
    }
  });

  return (
    <RigidBody
      ref={bodyRef}
      position={SPAWN_POSITION}
      colliders={false}
      enabledRotations={[false, false, false]}
      linearDamping={0.5}
      friction={0.2}
      mass={1}
      canSleep={false}
    >
      <CapsuleCollider args={[0.35, 0.45]} />
      <group ref={visualRef}>
        {/* body */}
        <mesh castShadow>
          <capsuleGeometry args={[0.45, 0.7, 4, 8]} />
          <meshStandardMaterial color="#ff6f59" flatShading />
        </mesh>
        {/* nose / facing indicator */}
        <mesh castShadow position={[0, 0.25, 0.45]}>
          <coneGeometry args={[0.18, 0.4, 6]} />
          <meshStandardMaterial color="#ffd166" flatShading />
        </mesh>
      </group>
    </RigidBody>
  );
}
