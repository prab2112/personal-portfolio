import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { playerPosition } from "../state/playerPosition";

const OFFSET = new Vector3(0, 13, 9);
const LOOK_OFFSET = new Vector3(0, 0.5, 0);
const LERP = 4;

const desired = new Vector3();
const targetLookAt = new Vector3();

export function CameraRig() {
  const { camera } = useThree();
  const currentLookAt = useRef(new Vector3().copy(playerPosition).add(LOOK_OFFSET));

  useFrame((_, delta) => {
    desired.copy(playerPosition).add(OFFSET);
    camera.position.lerp(desired, Math.min(1, LERP * delta));

    targetLookAt.copy(playerPosition).add(LOOK_OFFSET);
    currentLookAt.current.lerp(targetLookAt, Math.min(1, LERP * delta));
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
