import { getCamera } from "./camera.js";
import { canvas, scale } from "./canvas.js";
import { InputCode } from "./consts.js";
import { Vector, vec } from "./vector.js";

const inputsDown: Record<string, boolean> = {};
const inputsPressed: Record<string, boolean> = {};
const inputsReleased: Record<string, boolean> = {};

const mousePosition = vec();
const mouseWorldPosition = vec();

export let mostRecentInput = "";

export function setupInput() {
  window.addEventListener("keydown", ({ code, repeat }) => {
    mostRecentInput = code;
    onDown(code, repeat);
  });

  window.addEventListener("keyup", ({ code }) => {
    onUp(code);
  });

  window.addEventListener("focus", () => {
    resetAllInputCode();
  });

  window.addEventListener("blur", () => {
    resetAllInputCode();
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
    mousePosition.x = clientX / scale.x;
    mousePosition.y = clientY / scale.y;
  });

  canvas.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
}

function onDown(code: string, repeat: boolean) {
  if (repeat) return;
  inputsDown[code] = true;
  inputsPressed[code] = true;
  inputsReleased[code] = false;
}

function onUp(code: string) {
  inputsDown[code] = false;
  inputsPressed[code] = false;
  inputsReleased[code] = true;
}

function mouseButtonToCode(button: number): InputCode {
  switch (button) {
    case 0:
      return InputCode.MOUSE_LEFT;
    case 1:
      return InputCode.MOUSE_MIDDLE;
    case 2:
      return InputCode.MOUSE_RIGHT;
    default:
      return InputCode.NONE;
  }
}

export function updateMousePosition() {
  const camera = getCamera();
  mouseWorldPosition.x = mousePosition.x + camera.x;
  mouseWorldPosition.y = mousePosition.y + camera.y;
}

export function resetInputCode() {
  for (const key in inputsPressed) {
    inputsPressed[key] = false;
  }
  for (const key in inputsReleased) {
    inputsReleased[key] = false;
  }
}

export function resetAllInputCode() {
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

export function isInputPressed(code: InputCode) {
  return !!inputsPressed[code];
}

export function isInputDown(code: InputCode) {
  return !!inputsDown[code];
}

export function isInputReleased(code: InputCode) {
  return !!inputsReleased[code];
}

export function consumeInputPressed(code: InputCode) {
  inputsPressed[code] = false;
}

export function consumeInputDown(code: InputCode) {
  inputsDown[code] = false;
}

export function consumeInputReleased(code: InputCode) {
  inputsReleased[code] = false;
}

export function getMousePosition(inWorld: boolean): Readonly<Vector> {
  return inWorld ? mouseWorldPosition : mousePosition;
}
