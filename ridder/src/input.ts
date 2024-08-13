import { getCamera } from "./camera.js";
import { canvas, scale } from "./canvas.js";
import { Inputs } from "./consts.js";
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
    resetAllInputs();
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

function mouseButtonToCode(button: number): Inputs {
  switch (button) {
    case 0:
      return Inputs.MOUSE_LEFT;
    case 1:
      return Inputs.MOUSE_MIDDLE;
    case 2:
      return Inputs.MOUSE_RIGHT;
    default:
      return Inputs.NONE;
  }
}

export function updateMousePosition() {
  const camera = getCamera();
  mouseWorldPosition.x = mousePosition.x + camera.x;
  mouseWorldPosition.y = mousePosition.y + camera.y;
}

export function resetInputs() {
  for (const key in inputsPressed) {
    inputsPressed[key] = false;
  }
  for (const key in inputsReleased) {
    inputsReleased[key] = false;
  }
}

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

export function isInputPressed(code: Inputs) {
  return !!inputsPressed[code];
}

export function isInputDown(code: Inputs) {
  return !!inputsDown[code];
}

export function isInputReleased(code: Inputs) {
  return !!inputsReleased[code];
}

export function consumeInputPressed(code: Inputs) {
  inputsPressed[code] = false;
}

export function consumeInputDown(code: Inputs) {
  inputsDown[code] = false;
}

export function consumeInputReleased(code: Inputs) {
  inputsReleased[code] = false;
}

export function getMousePosition(inWorld: boolean): Readonly<Vector> {
  return inWorld ? mouseWorldPosition : mousePosition;
}
