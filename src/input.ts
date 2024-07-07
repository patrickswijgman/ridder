import { getCamera } from "./camera.js";
import { canvas, scale } from "./canvas.js";
import { Point, point } from "./point.js";

const inputsDown: Record<string, boolean> = {};
const inputsPressed: Record<string, boolean> = {};
const inputsReleased: Record<string, boolean> = {};

const mouseWorldPosition = point();
const mouseScreenPosition = point();

/**
 * The most recent pressed input's code.
 */
export let mostRecentInput = "";

/**
 * Add the input event listeners.
 */
export function setupInput() {
  window.addEventListener("keydown", ({ code, repeat }) => {
    mostRecentInput = code;
    onDown(code, repeat);
  });

  window.addEventListener("keyup", ({ code }) => {
    onUp(code);
  });

  window.addEventListener("blur", () => {
    resetAllInputs();
  });

  canvas.addEventListener("mousedown", ({ button }) => {
    const code = mouseButtonToCode(button);
    mostRecentInput = code;
    onDown(code, false);
  });

  canvas.addEventListener("mouseup", ({ button }) => {
    const code = mouseButtonToCode(button);
    onUp(code);
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
function onDown(code: string, repeat: boolean) {
  if (repeat) return;
  inputsDown[code] = true;
  inputsPressed[code] = true;
  inputsReleased[code] = false;
}

/**
 * Input up event listener.
 */
function onUp(code: string) {
  inputsDown[code] = false;
  inputsPressed[code] = false;
  inputsReleased[code] = true;
}

/**
 * Translate a mouse button to a string that's similar to a key code.
 */
function mouseButtonToCode(button: number) {
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
  mouseWorldPosition.x = mouseScreenPosition.x + camera.x;
  mouseWorldPosition.y = mouseScreenPosition.y + camera.y;
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
export function isInputPressed(code: string) {
  return !!inputsPressed[code];
}

/**
 * Returns true if the input is continuously pressed down.
 */
export function isInputDown(code: string) {
  return !!inputsDown[code];
}

/**
 * Returns true if the input has been released this frame.
 */
export function isInputReleased(code: string) {
  return !!inputsReleased[code];
}

/**
 * The mouse position on the canvas. Pass true to get the world space
 * coordinates otherwise get the screen space coordinates.
 */
export function getMousePosition(inWorld: boolean): Readonly<Point> {
  return inWorld ? mouseWorldPosition : mouseScreenPosition;
}
