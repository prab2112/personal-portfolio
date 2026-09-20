import { useEffect } from "react";
import { Physics } from "@react-three/rapier";
import { Sky } from "@react-three/drei";
import { Player } from "./Player";
import { World } from "./World";
import { Zones, ProximityWatcher } from "./Zones";
import { CameraRig } from "./CameraRig";
import { useGameStore } from "../store/useGameStore";

/** Mounts only once every suspending child above (Physics/wasm) has resolved. */
function ReadySignal() {
  const setPhase = useGameStore((s) => s.setPhase);
  useEffect(() => {
    setPhase("start");
  }, [setPhase]);
  return null;
}

export function Experience() {
  return (
    <>
      <color attach="background" args={["#bfe6f5"]} />
      <fog attach="fog" args={["#bfe6f5", 30, 75]} />
      <Sky sunPosition={[60, 40, 20]} turbidity={2} rayleigh={0.6} />

      <ambientLight intensity={0.7} />
      <directionalLight
        position={[20, 30, 10]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
        shadow-camera-far={100}
      />

      <Physics gravity={[0, -24, 0]}>
        <Player />
        <World />
      </Physics>

      <Zones />
      <ProximityWatcher />
      <CameraRig />
      <ReadySignal />
    </>
  );
}
