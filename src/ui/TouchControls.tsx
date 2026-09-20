import { useRef } from "react";
import { touchMoveVector } from "../input/touchInput";
import { triggerInteract } from "./interact";

const MAX_DRAG = 42;

export function TouchControls() {
  const baseRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const activePointer = useRef<number | null>(null);
  const origin = useRef({ x: 0, y: 0 });

  function handlePointerDown(e: React.PointerEvent) {
    const base = baseRef.current;
    if (!base) return;
    activePointer.current = e.pointerId;
    base.setPointerCapture(e.pointerId);
    const rect = base.getBoundingClientRect();
    origin.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    updateFromEvent(e.clientX, e.clientY);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (activePointer.current !== e.pointerId) return;
    updateFromEvent(e.clientX, e.clientY);
  }

  function handlePointerUp(e: React.PointerEvent) {
    if (activePointer.current !== e.pointerId) return;
    activePointer.current = null;
    touchMoveVector.x = 0;
    touchMoveVector.z = 0;
    if (thumbRef.current) thumbRef.current.style.transform = "translate(0px, 0px)";
  }

  function updateFromEvent(clientX: number, clientY: number) {
    let dx = clientX - origin.current.x;
    let dy = clientY - origin.current.y;
    const dist = Math.hypot(dx, dy);
    if (dist > MAX_DRAG) {
      dx = (dx / dist) * MAX_DRAG;
      dy = (dy / dist) * MAX_DRAG;
    }
    touchMoveVector.x = dx / MAX_DRAG;
    touchMoveVector.z = dy / MAX_DRAG;
    if (thumbRef.current) thumbRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
  }

  return (
    <div className="touch-controls">
      <div
        ref={baseRef}
        className="joystick-base"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div ref={thumbRef} className="joystick-thumb" />
      </div>
      <button
        className="interact-button"
        onPointerDown={(e) => {
          e.preventDefault();
          triggerInteract();
        }}
      >
        INTERACT
      </button>
    </div>
  );
}
