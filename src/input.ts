import { getCamera } from "./camera.js";
import { canvas, scale } from "./canvas.js";
import { Vec, vec } from "./vector.js";

const inputsDown: Record<string, boolean> = {};
const inputsPressed: Record<string, boolean> = {};
const inputsReleased: Record<string, boolean> = {};

const mouseWorldPosition = vec();
const mouseScreenPosition = vec();

/**
 * Add the input event listeners.
 */
export function setupInput() {
  window.addEventListener("keydown", ({ code, repeat }) => {
    onDown(code, repeat);
  });

  window.addEventListener("keyup", ({ code }) => {
    onUp(code);
  });

  window.addEventListener("blur", () => {
    resetAllInputs();
  });

  canvas.addEventListener("mousedown", ({ button }) => {
    onDown(mouseButtonToString(button), false);
  });

  canvas.addEventListener("mouseup", ({ button }) => {
    onUp(mouseButtonToString(button));
  });

  canvas.addEventListener("mousemove", ({ clientX, clientY }) => {
    const x = clientX / scale.x;
    const y = clientY / scale.y;
    mouseScreenPosition.set(x, y);
  });

  canvas.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
}

/**
 * Input down event listener.
 */
function onDown(id: string, repeat: boolean) {
  if (repeat) return;
  inputsDown[id] = true;
  inputsPressed[id] = true;
  inputsReleased[id] = false;
}

/**
 * Input up event listener.
 */
function onUp(id: string) {
  inputsDown[id] = false;
  inputsPressed[id] = false;
  inputsReleased[id] = true;
}

/**
 * Translate a mouse button to a string.
 */
function mouseButtonToString(button: number) {
  switch (button) {
    case 0:
      return "MouseLeft";
    case 1:
      return "MouseMiddle";
    case 2:
      return "MouseRight";
    default:
      return `Mouse${button}`;
  }
}

/**
 * Update the mouse position in world space.
 */
export function updateMousePosition() {
  const camera = getCamera();

  mouseWorldPosition.set(
    mouseScreenPosition.x + camera.x,
    mouseScreenPosition.y + camera.y,
  );
}

/**
 * Reset the pressed and released inputs back to false.
 */
export function resetInputs() {
  for (const key in inputsPressed) {
    inputsPressed[key] = false;
  }

  for (const key in inputsReleased) {
    inputsReleased[key] = false;
  }
}

/**
 * Reset all inputs back to false.
 */
export function resetAllInputs() {
  for (const key in inputsDown) {
    inputsDown[key] = false;
  }

  for (const key in inputsPressed) {
    inputsPressed[key] = false;
  }

  for (const key in inputsReleased) {
    inputsReleased[key] = false;
  }
}

/**
 * Returns true if the input has been pressed this frame.
 */
export function isInputPressed(id: string) {
  return !!inputsPressed[id];
}

/**
 * Returns true if the input is continuously pressed down.
 */
export function isInputDown(id: string) {
  return !!inputsDown[id];
}

/**
 * Returns true if the input has been released this frame.
 */
export function isInputReleased(id: string) {
  return !!inputsReleased[id];
}

/**
 * The mouse position on the canvas.
 */
export function getMousePosition(inWorld: boolean): Readonly<Vec> {
  return inWorld ? mouseWorldPosition : mouseScreenPosition;
}
