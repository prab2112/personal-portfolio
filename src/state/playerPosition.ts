import { Vector3 } from "three";

// A single mutable Vector3 the player writes into every frame and other
// systems (camera, proximity checks) read from — avoids prop drilling and
// avoids putting a fast-changing value in React/zustand state.
export const playerPosition = new Vector3(0, 0, 0);
