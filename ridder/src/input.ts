import { getCamera } from "./camera.js";
import { canvas } from "./canvas.js";
import { InputCode } from "./consts.js";
import { getEngineState } from "./state.js";
import { vec } from "./vector.js";

const inputsDown: Record<string, boolean> = {};
const inputsPressed: Record<string, boolean> = {};
const inputsReleased: Record<string, boolean> = {};

const mousePosition = vec();
const mouseWorldPosition = vec();

export function setupInput() {
  window.addEventListener("keydown", ({ code, repeat }) => {
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

  canvas.addEventListener("pointerdown", ({ button }) => {
    onDown(mouseButtonToCode(button), false);
  });

  canvas.addEventListener("pointerup", ({ button }) => {
    onUp(mouseButtonToCode(button));
  });

  canvas.addEventListener("pointermove", ({ clientX, clientY }) => {
    const state = getEngineState();
    mousePosition.x = clientX / state.scale.x;
    mousePosition.y = clientY / state.scale.y;
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
  mouseWorldPosition.x = mousePosition.x + camera.position.x;
  mouseWorldPosition.y = mousePosition.y + camera.position.y;
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

export function getMousePosition(inWorld: boolean) {
  return inWorld ? mouseWorldPosition : mousePosition;
}
