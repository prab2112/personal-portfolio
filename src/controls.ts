export const Controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  interact: "interact",
} as const;

export const keyboardMap = [
  { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
  { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
  { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
  { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
  { name: Controls.interact, keys: ["KeyE", "Space", "Enter"] },
];
