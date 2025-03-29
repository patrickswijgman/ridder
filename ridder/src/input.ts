import { getCameraPosition } from "./camera.js";
import { canvas, scale } from "./canvas.js";
import { InputCode } from "./consts.js";
import { vec, Vector } from "./vector.js";

const inputsDown: Record<string, boolean> = {};
const inputsPressed: Record<string, boolean> = {};
const inputsReleased: Record<string, boolean> = {};

const mousePosition = vec();
const mousePositionInWorld = vec();

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
    onPointerEvent(event);
    const code = getMouseButtonCode(event.button);
    if (code) {
      onDown(code);
    }
  });

  canvas.addEventListener("pointerup", (event) => {
    event.preventDefault();
    onPointerEvent(event);
    const code = getMouseButtonCode(event.button);
    if (code) {
      onUp(code);
    }
  });

  canvas.addEventListener("pointermove", (event) => {
    event.preventDefault();
    onPointerEvent(event);
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
function onPointerEvent(event: PointerEvent) {
  mousePosition.x = event.clientX / scale.x;
  mousePosition.y = event.clientY / scale.y;

  const camera = getCameraPosition();
  mousePositionInWorld.x = mousePosition.x + camera.x;
  mousePositionInWorld.y = mousePosition.y + camera.y;
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
 * Reset a single input's state back to `false`.
 */
export function resetInput(code: InputCode) {
  inputsDown[code] = false;
  inputsPressed[code] = false;
  inputsReleased[code] = false;
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
 *
 * Optionally consumes the input so that sequential calls in the current frame return `false`.
 */
export function isInputPressed(code: InputCode, consume = false) {
  const isPressed = !!inputsPressed[code];

  if (isPressed && consume) {
    inputsDown[code] = false;
    inputsPressed[code] = false;
  }

  return isPressed;
}

/**
 * Returns `true` if the input is currently down.
 *
 * Optionally consumes the input so that sequential calls in the current frame return `false`.
 */
export function isInputDown(code: InputCode, consume = false) {
  const isDown = !!inputsDown[code];

  if (isDown && consume) {
    inputsDown[code] = false;
    inputsPressed[code] = false;
  }

  return isDown;
}

/**
 * Returns `true` if the input is currently released.
 */
export function isInputReleased(code: InputCode, consume = false) {
  const isReleased = !!inputsReleased[code];

  if (isReleased && consume) {
    inputsReleased[code] = false;
  }

  return isReleased;
}

/**
 * Get the current mouse position on the canvas.
 * @param inWorld Whether or not to get the mouse position affected by the camera.
 */
export function getMousePosition(inWorld: boolean): Readonly<Vector> {
  return inWorld ? mousePositionInWorld : mousePosition;
}
