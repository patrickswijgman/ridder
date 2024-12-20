import { getCameraPosition } from "./camera.js";
import { canvas, scale } from "./canvas.js";
import { InputCode } from "./consts.js";
import { vec } from "./vector.js";

const inputsDown: Record<string, boolean> = {};
const inputsPressed: Record<string, boolean> = {};
const inputsReleased: Record<string, boolean> = {};

const mousePosition = vec();
const mouseWorldPosition = vec();

/**
 * Add the event listeners to listen to key and mouse events.
 */
export function setupInput() {
  window.addEventListener("keydown", (event) => {
    event.preventDefault();
    onDown(event.code);
  });

  window.addEventListener("keyup", (event) => {
    event.preventDefault();
    onUp(event.code);
  });

  canvas.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    onPointerEvent(canvas, event);
    const code = getMouseButtonCode(event.button);
    if (code) {
      onDown(code);
    }
  });

  canvas.addEventListener("pointerup", (event) => {
    event.preventDefault();
    onPointerEvent(canvas, event);
    const code = getMouseButtonCode(event.button);
    if (code) {
      onUp(code);
    }
  });

  canvas.addEventListener("pointermove", (event) => {
    event.preventDefault();
    onPointerEvent(canvas, event);
  });

  // Disable context menu to enable right mouse button as input.
  canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  // Prevent sticky keys when the window loses focus or is minimized.
  window.addEventListener("focus", resetInputs);
  window.addEventListener("blur", resetInputs);
  document.addEventListener("visibilitychange", resetInputs);
}

/**
 * Handle key or mouse down event.
 */
function onDown(code: string) {
  if (inputsDown[code]) return;
  inputsDown[code] = true;
  inputsPressed[code] = true;
  inputsReleased[code] = false;
}

/**
 * Handle key or mouse up event.
 */
function onUp(code: string) {
  inputsDown[code] = false;
  inputsPressed[code] = false;
  inputsReleased[code] = true;
}

/**
 * Handle generic pointer event.
 */
function onPointerEvent(target: HTMLElement, event: PointerEvent) {
  const offset = target.getBoundingClientRect();
  mousePosition.x = event.clientX / scale.x - offset.x;
  mousePosition.y = event.clientY / scale.y - offset.y;
}

/**
 * Translate the numerical mouse button to a string, similar to the key codes.
 */
function getMouseButtonCode(button: number): InputCode | null {
  switch (button) {
    case 0:
      return InputCode.MOUSE_LEFT;
    case 1:
      return InputCode.MOUSE_MIDDLE;
    case 2:
      return InputCode.MOUSE_RIGHT;
    default:
      return null;
  }
}

/**
 * Update the current mouse position in the world according to the camera position.
 */
export function updateMousePosition() {
  const camera = getCameraPosition();
  mouseWorldPosition.x = mousePosition.x + camera.x;
  mouseWorldPosition.y = mousePosition.y + camera.y;
}

/**
 * Reset the pressed and released inputs back to `false`.
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
 * Reset all inputs back to `false`.
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
 * Returns `true` if the input is currently pressed.
 */
export function isInputPressed(code: InputCode) {
  return !!inputsPressed[code];
}

/**
 * Returns `true` if the input is currently down.
 */
export function isInputDown(code: InputCode) {
  return !!inputsDown[code];
}

/**
 * Returns `true` if the input is currently released.
 */
export function isInputReleased(code: InputCode) {
  return !!inputsReleased[code];
}

/**
 * Reset the pressed input back to `false`.
 */
export function consumeInputPressed(code: InputCode) {
  inputsPressed[code] = false;
}

/**
 * Reset the down input back to `false`.
 */
export function consumeInputDown(code: InputCode) {
  inputsDown[code] = false;
}

/**
 * Reset the released input back to `false`.
 */
export function consumeInputReleased(code: InputCode) {
  inputsReleased[code] = false;
}

/**
 * Get the current mouse position.
 * @param inWorld - Whether to get the mouse position within the world (the one that is affected by the camera) or on the canvas.
 */
export function getMousePosition(inWorld: boolean) {
  return inWorld ? mouseWorldPosition : mousePosition;
}
