import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { keyboardMap } from "./controls";
import { Experience } from "./components/Experience";
import { useGameStore } from "./store/useGameStore";
import { LoadingScreen } from "./ui/LoadingScreen";
import { StartScreen } from "./ui/StartScreen";
import { HUD } from "./ui/HUD";
import { Modal } from "./ui/Modal";
import { TouchControls } from "./ui/TouchControls";
import { QuickNav } from "./ui/QuickNav";
import { InteractHandler } from "./ui/InteractHandler";
import "./ui/ui.css";

export default function App() {
  const phase = useGameStore((s) => s.phase);

  return (
    <>
      <KeyboardControls map={keyboardMap}>
        <Canvas shadows camera={{ fov: 45, near: 0.1, far: 200 }}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </Canvas>
      </KeyboardControls>

      {phase === "loading" && <LoadingScreen />}
      {phase === "start" && <StartScreen />}
      {phase === "playing" && (
        <>
          <HUD />
          <TouchControls />
          <QuickNav />
        </>
      )}
      <Modal />
      <InteractHandler />
    </>
  );
}
