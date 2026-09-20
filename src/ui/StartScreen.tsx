import { useGameStore } from "../store/useGameStore";
import { profile } from "../content/content";

export function StartScreen() {
  const setPhase = useGameStore((s) => s.setPhase);

  return (
    <div className="start-screen">
      <h1>{profile.name}</h1>
      <p className="tagline">{profile.tagline}</p>
      <button className="start-button" onClick={() => setPhase("playing")}>
        Explore the island
      </button>
      <div className="start-hints">
        <span className="start-hint">
          <span className="key">W</span>
          <span className="key">A</span>
          <span className="key">S</span>
          <span className="key">D</span>
          move
        </span>
        <span className="start-hint">
          <span className="key">E</span>
          interact
        </span>
        <span className="start-hint">or use the on-screen joystick on mobile</span>
      </div>
    </div>
  );
}
